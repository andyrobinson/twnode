import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ServletWithExternalData extends HttpServlet {

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException  {

		PrintWriter out = resp.getWriter();
		
		out.println("<html>\n<body>\n<h1>Hello from Servlet with Dependency</h1>");
		out.println((new SimpleHttpClient()).get("http://127.0.0.1:8001/"));
		out.println("</body>\n</html>");
	}
    
}
