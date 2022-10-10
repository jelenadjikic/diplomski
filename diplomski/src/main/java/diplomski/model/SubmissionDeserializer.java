package diplomski.model;
import java.nio.ByteBuffer;
import java.util.Map;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Deserializer;

public class SubmissionDeserializer implements Deserializer<Submission> {
    private String encoding = "UTF8";
    
    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
                //Nothing to configure
    }
    
    @Override
    public Submission deserialize(String topic, byte[] data) {

        try {
            
        	if (data == null)
            {
                System.out.println("Null recieved at deserialize");
                return null;
            }
        	
            ByteBuffer buf = ByteBuffer.wrap(data);
            
            Integer id = buf.getInt();

            int sizeOfAuthorName = buf.getInt();
            byte[] authorNameBytes = new byte[sizeOfAuthorName];
            buf.get(authorNameBytes);
            String deserializedAuthorName = new String(authorNameBytes, encoding);
            
            int sizeOfTitle= buf.getInt();
            byte[] titleBytes = new byte[sizeOfTitle];
            buf.get(titleBytes);
            String deserializedTitle = new String(titleBytes, encoding);
           
            int sizeOfText= buf.getInt();
            byte[] textBytes = new byte[sizeOfText];
            buf.get(textBytes);
            String deserializedText = new String(textBytes, encoding);
            
            int sizeOfPrice= buf.getInt();
            byte[] priceBytes = new byte[sizeOfPrice];
            buf.get(priceBytes);
            String deserializedPrice = new String(priceBytes, encoding);
            
            int sizeOfLocation= buf.getInt();
            byte[] locationBytes = new byte[sizeOfLocation];
            buf.get(locationBytes);
            String deserializedLocation = new String(locationBytes, encoding);
            
            int sizeOfContactNumber= buf.getInt();
            byte[] contactNumberBytes = new byte[sizeOfContactNumber];
            buf.get(contactNumberBytes);
            String deserializedContactNumber = new String(contactNumberBytes, encoding);
            
            int sizeOfEmail= buf.getInt();
            byte[] emailBytes = new byte[sizeOfEmail];
            buf.get(emailBytes);
            String deserializedEmail = new String(emailBytes, encoding);
            
            int sizeOfLink= buf.getInt();
            byte[] linkBytes = new byte[sizeOfLink];
            buf.get(linkBytes);
            String deserializedLink = new String(linkBytes, encoding);
               
            int sizeOfLikes = buf.getInt();
            byte[] likesBytes = new byte[sizeOfLikes];
            buf.get(likesBytes);
            String deserializedLikes = new String(likesBytes, encoding);
            
            int sizeOfDislikes= buf.getInt();
            byte[] dislikesBytes = new byte[sizeOfDislikes];
            buf.get(dislikesBytes);
            String deserializedDislikes = new String(dislikesBytes, encoding);
            
            int sizeOfDatePublished= buf.getInt();
            byte[] datePublishedBytes = new byte[sizeOfDatePublished];
            buf.get(datePublishedBytes);
            String deserializedDatePublished= new String(datePublishedBytes, encoding);
            
            
            return new Submission(id,deserializedAuthorName,deserializedTitle,deserializedText, 
            					Integer.valueOf(deserializedPrice),deserializedLocation,deserializedContactNumber,deserializedEmail,deserializedLink,
            					Integer.valueOf(deserializedLikes),Integer.valueOf(deserializedDislikes),deserializedDatePublished);

        } catch (Exception e) {
            throw new SerializationException("Error when deserializing byte[] to Supplier");
        }
    }
    
    @Override
    public void close() {
        // nothing to do
    }

}