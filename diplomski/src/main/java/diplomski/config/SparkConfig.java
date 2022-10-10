package diplomski.config;
import org.apache.spark.SparkConf;

public class SparkConfig {

    public SparkConf sparkConf() {
        return new SparkConf()
                .setAppName("Diplomski")
                .setMaster("local[2]")
                .set("spark.cleaner.ttl", "600");
    }
}