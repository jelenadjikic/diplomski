package diplomski.config;
import diplomski.model.SubmissionDeserializer;

import java.util.HashMap;
import java.util.Map;
import org.apache.kafka.common.serialization.StringDeserializer;

public class KafkaConfig {

    public Map<String, Object> configs() {
    	Map<String, Object> properties = new HashMap<>();
    	
        properties.put("bootstrap.servers", "localhost:9092");
        properties.put("key.deserializer", StringDeserializer.class);
        properties.put("value.deserializer", SubmissionDeserializer.class);
        properties.put("group.id", "java-group-consumer");
        properties.put("auto.offset.reset", "latest");
        properties.put("enable.auto.commit", false);
       
        return properties;
    }
}