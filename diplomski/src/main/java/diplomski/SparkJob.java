package diplomski;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.spark.SparkConf;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaInputDStream;
import org.apache.spark.streaming.api.java.JavaPairDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.kafka010.ConsumerStrategies;
import org.apache.spark.streaming.kafka010.KafkaUtils;
import org.apache.spark.streaming.kafka010.LocationStrategies;
import org.jvnet.hk2.annotations.Service;

import diplomski.config.KafkaConfig;
import diplomski.config.SparkConfig;
import diplomski.domain.Keyword;
import diplomski.model.Submission;
import diplomski.service.DataProccessingService;
import diplomski.service.MySQLService;
import lombok.extern.slf4j.Slf4j;
import scala.Tuple2;

@Service
@Slf4j
public class SparkJob{
	
	private final Collection<String> topics = Arrays.asList("t1");
	private final SparkConf sparkConf;
	private final KafkaConfig kafkaConfig;

	public SparkJob(KafkaConfig kafkaConfig, SparkConf sConfig)
	{
		this.kafkaConfig=kafkaConfig;
		this.sparkConf=sConfig;
	}
	
	public void run(String[]  args)
	{
		System.out.println("Running Spark Service...");

		Collection<Keyword> allKeywordsFromDB=MySQLService.getAllKeywordsFromDatabase();

		JavaStreamingContext jsc=new JavaStreamingContext(sparkConf, new Duration(10000));
		
		JavaInputDStream<ConsumerRecord<String, Submission>> records = KafkaUtils.createDirectStream(
                											jsc, 
                											LocationStrategies.PreferConsistent(),
                											ConsumerStrategies.Subscribe(topics, kafkaConfig.configs()));
		
        JavaDStream<Submission> allSubmissions = records.map(data -> data.value());
        
        JavaDStream<Submission> submissionsWithText = allSubmissions.filter(data -> (data.getText()!=""));
        
        JavaPairDStream<Submission, List<Keyword>> subKeywordsPairs = submissionsWithText
        															  .mapToPair(submission -> new Tuple2<>(
        															  submission, 
        															  DataProccessingService.getAllKeywordsFromSubmission2(
        															  submission.getText(), 
        															  submission.getPrice(), 
        															  submission.getLocation(), 
        															  submission.getLikes(), 
        															  allKeywordsFromDB)))
        															  .filter(tuple -> !tuple._2.isEmpty());
       subKeywordsPairs.foreachRDD(rdd -> {
        				rdd.foreach(tuple -> {
        				MySQLService.saveKeywordsOccurrence(tuple._1, tuple._2);
        				});});
        
        jsc.start();
       
        try {

            jsc.awaitTermination();
        } catch (Exception e) {
            System.out.println("Spark Service interrupted ->  " +  e.getMessage());
        }
	}

	public static void main(String[] args) {
		KafkaConfig kConfig=new KafkaConfig();
		SparkConfig sConfig = new SparkConfig();
		SparkJob sparkJob=new SparkJob(kConfig,sConfig.sparkConf());
		sparkJob.run(args);
	}

}
