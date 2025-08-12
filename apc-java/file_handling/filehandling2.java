import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

public class filehandling2 {
    public static void main(String[] args) throws Exception {
        File dir = new File("exampleDir");
        dir.mkdir();
        File f1 = new File(dir, "example.txt");
        f1.createNewFile();
        FileWriter f = new FileWriter(f1, true);
        f.write("abc");
        f.write("def");
        f.flush();
        FileReader fr = new FileReader(f1);
        int i = fr.read();
        while(i != -1){
            System.out.print((char)i);
            i = fr.read();
          }
        // System.out.println(fr.read());

    }
}
