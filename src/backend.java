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
            System.out.println("Error sintactico. Usa backend (port)");
            return;
        }
 
        int port = Integer.parseInt(args[0]);
 
        try (ServerSocket serverSocket = new ServerSocket(port)) {
 
            System.out.println("Servidor central escuchando en el puerto " + port);
 
            while (true) {
                Socket socket = serverSocket.accept();
                System.out.println("Cliente conectado");
 
                OutputStream output = socket.getOutputStream();
                PrintWriter writer = new PrintWriter(output, true);
 
                writer.println(new Date().toString());
                socket.close();
            }
 
        } catch (IOException ex) {
            System.out.println("Server exception: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}