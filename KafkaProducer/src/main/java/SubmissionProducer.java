import java.util.Properties;
import java.util.concurrent.TimeUnit;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import java.sql.*;


public class SubmissionProducer {
	public SubmissionProducer() throws InterruptedException
	{
		 Properties properties=new Properties();
		 properties.put("bootstrap.servers", "localhost:9092");
		 properties.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
		 properties.put("value.serializer",SubmissionSerializer.class);
		 		 
		 KafkaProducer kafkaProducer= new KafkaProducer(properties);
		 
		 ReadAndSendSubmissions(kafkaProducer);
		
         System.out.println("Submissions sent!");
         
		 kafkaProducer.flush();
		 kafkaProducer.close();	
	}
	
 
  public void ReadAndSendSubmissions(KafkaProducer kafkaProducer) {
	  
	try {  
			Connection con=DriverManager.getConnection("jdbc:Mysql://localhost:3306/diplomski","root","admin");  
			Statement stmt=con.createStatement();  
			ResultSet rs=stmt.executeQuery("select * from submission");  
			
			while(rs.next())  
			{
				Submission oneRow=new Submission(rs.getInt(1), rs.getString(2), rs.getString(3),
												 rs.getString(4),rs.getInt(5), rs.getString(6), 
												 rs.getString(7), rs.getString(8),rs.getString(9),
												 rs.getInt(10),rs.getInt(11),rs.getString(12));
				
				ProducerRecord producerRecord=new ProducerRecord("t1", oneRow);
		        kafkaProducer.send(producerRecord);	
		        
		        TimeUnit.SECONDS.sleep(7);
	  		}
	  		con.close();  	
  	}
	catch(Exception e)
	{ 
		System.out.println(e);
	}
  }
	
	
	

}
