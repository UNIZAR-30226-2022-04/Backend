import java.util.HashSet;
import java.util.Set;
import javax.enterprise.context.ApplicationScoped;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * @author MoonCode
 */
@ApplicationScoped
@ServerEndpoint("/progress")
public class ServerWebSocket {

    private Set<Session> sessions = new HashSet<>();

    public void open(Session session) {
        System.out.println("Session opened ==>");
        sessions.add(session);
    }

    public void handleMessage(String message, Session session) {
        System.out.println("new message ==> " + message);
        try {
            for (Session s : sessions) {
                s.getBasicRemote().sendText();
            }
            Thread.sleep(100);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
    }

    public void close(Session session) {
        System.out.println("Session closed ==>");
        sessions.remove(session);
    }

    public void run(Session session){
        
        
    }
}

/*public class treatMsg extends Thread{

    public void run(Socket socket){
        
        try {
            OutputStream output = socket.getOutputStream();
            //PrintWriter writer = new PrintWriter(output, true);
            //writer.println(new Date().toString());

            //tratamiento

            socket.close();
        } catch (IOException ex) {
            System.out.println("Socket exception: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}*/
