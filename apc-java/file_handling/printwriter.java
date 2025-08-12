import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
public class printwriter {
    public static void main(String[] args) throws Exception {
        File file = new File("example.txt");
        PrintWriter pw = new PrintWriter(new FileWriter(file), true);
        pw.println("Hello, World!");
        // pw.flush();

    }
}
