import java.net.*;

import gameutils.ServerWebSocket;

 
/**
 * Programa principal del servidor central
 *
 * @author MoonCode
 */

public class ServerManager {
    public static void main(String[] args) {
		try {
			new ServerWebSocket(8887).start();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}
}