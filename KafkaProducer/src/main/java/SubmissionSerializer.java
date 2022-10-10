import org.apache.kafka.common.serialization.Serializer;
import org.apache.kafka.common.errors.SerializationException;
import java.nio.ByteBuffer;

public class SubmissionSerializer implements Serializer<Submission> {
	
    private String encoding = "UTF8";

    public byte[] serialize(String topic, Submission data) {

                int sizeOfAuthorName;
                int sizeOfTitle;
                int sizeOfText;
                int sizeOfPrice;
                int sizeOfLocation;
                int sizeOfContactNumber;
                int sizeOfEmail;
                int sizeOfLink;
                int sizeOfLikes;
                int sizeOfDislikes;
                int sizeOfDatePublished;
                byte[] serializedAuthorName;
                byte[] serializedTitle;
                byte[] serializedText;
                byte[] serializedPrice;
                byte[] serializedLocation;
                byte[] serializedContactNumber;
                byte[] serializedEmail;
                byte[] serializedLink;
                byte[] serializedLikes;
                byte[] serializedDislikes;
                byte[] serializedDatePublished;

        try {
        	
            if (data == null)
                return null;
	        serializedAuthorName = data.getAuthorName().getBytes(encoding);
	        sizeOfAuthorName = serializedAuthorName.length;
	        
	        serializedTitle = data.getTitle().getBytes(encoding);
	        sizeOfTitle = serializedTitle.length;
	        
	        serializedText = data.getText().getBytes(encoding);
	        sizeOfText = serializedText.length;
	        
	        serializedPrice = data.getPrice().toString().getBytes(encoding);
	        sizeOfPrice = serializedPrice.length;
	        
	        serializedLocation = data.getLocation().getBytes(encoding);
	        sizeOfLocation = serializedLocation.length;
	        
	        serializedContactNumber = data.getContactNumber().getBytes(encoding);
	        sizeOfContactNumber = serializedContactNumber.length;
	        
	        serializedEmail = data.getEmail().getBytes(encoding);
	        sizeOfEmail = serializedEmail.length;
	        
	        serializedLink = data.getLink().getBytes(encoding);
	        sizeOfLink = serializedLink.length;
	        
	        serializedLikes = data.getLikes().toString().getBytes(encoding);
	        sizeOfLikes= serializedLikes.length;
	        
	        serializedDislikes= data.getDislikes().toString().getBytes(encoding);
	        sizeOfDislikes = serializedDislikes.length;
	        
	        serializedDatePublished= data.getDatePublished().getBytes(encoding);
	        sizeOfDatePublished = serializedDatePublished.length;
	        
	        
	
	        ByteBuffer buf = ByteBuffer.allocate(4+4+sizeOfAuthorName
	        							+4+sizeOfTitle+4+sizeOfText
	        							+4+sizeOfPrice+4+sizeOfLocation
	        							+4+sizeOfContactNumber+4+sizeOfEmail
	        							+4+sizeOfLink+4+sizeOfLikes
	        							+4+sizeOfDislikes+4+sizeOfDatePublished);
	        buf.putInt(data.getId());
	        
	        buf.putInt(sizeOfAuthorName);
	        buf.put(serializedAuthorName);
	        
	        buf.putInt(sizeOfTitle);
	        buf.put(serializedTitle);
	        
	        buf.putInt(sizeOfText);
	        buf.put(serializedText);
	        
	        buf.putInt(sizeOfPrice);
	        buf.put(serializedPrice);

	        buf.putInt(sizeOfLocation);
	        buf.put(serializedLocation);
	        
	        buf.putInt(sizeOfContactNumber);
	        buf.put(serializedContactNumber);
	        
	        buf.putInt(sizeOfEmail);
	        buf.put(serializedEmail);
	        
	        buf.putInt(sizeOfLink);
	        buf.put(serializedLink);
	        
	        buf.putInt(sizeOfLikes);
	        buf.put(serializedLikes);
	        
	        buf.putInt(sizeOfDislikes);
	        buf.put(serializedDislikes);
	        
	        buf.putInt(sizeOfDatePublished);
	        buf.put(serializedDatePublished);
	        
            return buf.array();

        } catch (Exception e) {
            throw new SerializationException("Error when serializing Submission to byte[]");
        }
    }

}