package diplomski.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Keyword implements Serializable {

	@Id
	@Column(name = "word")
	private String word;
	
	public String getWord() {	
		return word;
	}
	public void setWord(String word2) {	
		word=word2;
	}

	@Column(name = "lowestPrice")
   	 private int lowestPrice;
	
	public int getLowestPrice() {	
		return lowestPrice;
	}
	public void setLowestPrice(int lowestPrice2){	
		lowestPrice=lowestPrice2;
	}

	@Column(name = "highestPrice")
   	 private int highestPrice;
	
	public int getHighestPrice() {	
		return highestPrice;
	}
	public void setHighestPrice(int highestPrice2){	
		highestPrice=highestPrice2;
	}

	@Column(name = "location")
    	private String location;
	
	public String getLocation() {	
		return location;
	}
	public void setLocation(String location2) {	
		location=location2;
	}

	@Column(name = "minNumOfLikes")
   	 private int minNumOfLikes;
	
	public int getMinNumOfLikes() {	
		return minNumOfLikes;
	}
	public void setMinNumOfLikes(int minNumOfLikes2){	
		minNumOfLikes=minNumOfLikes2;
	}
	
	public Keyword(String word2, int lowestPrice2, int highestPrice2, String location2, int minNumOfLikes2) {
		word=word2;
		lowestPrice=lowestPrice2;
		highestPrice=highestPrice2;
		location=location2;
		minNumOfLikes=minNumOfLikes2;
		
	}

	public Keyword() {

	}

	

 

	
}