package diplomski.service;

import diplomski.domain.Keyword;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

public class DataProccessingService {

	public static void main(String[] args) {	
	}
		
	public static List<Keyword> getAllKeywordsFromSubmission(String text, Integer price, String location, Integer likes, Collection<Keyword> keywordsFromDB)  {
			
	    List<Keyword> keywordsForText = new ArrayList<>();
		try{  
			
	        String[] split = text.toLowerCase().split("\\s+");
	        String[] words = new HashSet<>(Arrays.asList(split)).toArray(new String[0]);
	        
	       
	        for (String word : words) {
	           for(Keyword k : keywordsFromDB)
	           {
	        	   if(word.equals(k.getWord()) && price>=k.getLowestPrice() && price<=k.getHighestPrice() && location.equals(k.getLocation()) && likes >= k.getMinNumOfLikes())
	        	   {
	        		   keywordsForText.add(k);
	        	   }
	           }
	        }
		}
		catch(Exception e)
		{ 
			System.out.println(e);
		}
		return keywordsForText;  
	} 
	
	// U X nalazi Y
	public static int strstr(String X, String Y)
    {
        // if `X` is null or if X's length is less than that of Y's
        if (X == null || Y.length() > X.length()) {
            return -1;
        }
 
        // if `Y` is null or is empty
        if (Y == null || Y.length() == 0) {
            return 0;
        }
 
        for (int i = 0; i <= X.length() - Y.length(); i++)
        {
            int j;
            for (j = 0; j < Y.length(); j++) {
                if (Y.charAt(j) != X.charAt(i + j)) {
                    break;
                }
            }
 
            if (j == Y.length()) {
                return i;
            }
        }
 
        return -1;
    }

	public static List<Keyword> getAllKeywordsFromSubmission2(String text, Integer price, String location, Integer likes, Collection<Keyword> keywordsFromDB)  {
		
		String textLower=text.toLowerCase();
	    List<Keyword> keywordsForText = new ArrayList<>();
		try{  
	           for(Keyword k : keywordsFromDB)
	           {
	        	   if(strstr(textLower,k.getWord())>0 && price>=k.getLowestPrice() && price<=k.getHighestPrice() && location.equals(k.getLocation()) && likes >= k.getMinNumOfLikes())
	        	   {
	        		   keywordsForText.add(k);
	        	   }
	           }
	        
		}
		catch(Exception e)
		{ 
			System.out.println(e);
		}
		return keywordsForText;  
	} 
}

