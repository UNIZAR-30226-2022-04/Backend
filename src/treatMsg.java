import java.io.*;
import java.net.*;

public class treatMsg extends Thread{

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
}
