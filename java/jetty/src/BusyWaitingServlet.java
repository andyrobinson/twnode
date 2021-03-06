import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class BusyWaitingServlet extends HttpServlet {
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException  {

		Long start = timeInMilliseconds();
		
		PrintWriter out = resp.getWriter();

		while (timeInMilliseconds() < start + 1000) {
			for (int i=1; i < 1000; i++) {}
		}
		
		out.println("<html>\n<body>\n<h1>Hello from Busy Waiting Servlet</h1>\n</body>\n</html>");
	}
	
	private long timeInMilliseconds() {
		return new Date().getTime();
	}

}
