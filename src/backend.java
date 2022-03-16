import java.io.*;
import java.net.*;
import java.util.Date;
 
/**
 * Programa principal del servidor central
 *
 * @author MoonCode
 */
public class backend {
    public static void main(String[] args) {
        if (args.length < 1 || args.length > 1) {
            System.out.println("Syntax error. Use: backend <port>");
            return;
        }
 
        int port = Integer.parseInt(args[0]);
 
        try (ServerSocket serverSocket = new ServerSocket(port)) {
 
            System.out.println("Central server listening on port: " + port);
 
            while (true) {
                Socket socket = serverSocket.accept();
                System.out.println("Client connected");
                treatMsg tr = new treatMsg();
                tr.start();
            }
 
        } catch (IOException ex) {
            System.out.println("Server exception: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}