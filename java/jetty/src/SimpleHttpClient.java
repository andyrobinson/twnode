import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

public class SimpleHttpClient {

	public String get(String urlString) {

		StringBuffer result = new StringBuffer();
	    BufferedReader clientResult = null;
	    
	    try {
		    URL url = new URL(urlString);
		    URLConnection urlConn = url.openConnection(); 
		
	        clientResult = new BufferedReader(new InputStreamReader(urlConn.getInputStream()));

	        String inputLine = "";
			while (inputLine != null) {
		    	result.append(inputLine);
		    	inputLine = clientResult.readLine();
			}
    		clientResult.close();

	    }
	    catch (Exception ex) {
	    	result.append("ERROR: " + ex.toString());
	    } 

	    return result.toString();
	}

}
