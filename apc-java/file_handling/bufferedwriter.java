import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
public class bufferedwriter {

    public static void main(String[] args) throws Exception {
        File file = new File("example.txt");
        FileWriter f = new FileWriter(file);
        BufferedWriter bw = new BufferedWriter(f);
        
        bw.write("Hello, World!");
        bw.newLine();
        bw.write("my nsm is");
        bw.flush();
        

        FileReader fr = new FileReader(file);
        BufferedReader br = new BufferedReader(fr);
        String l;
        while((l = br.readLine()) != null){
        System.out.println(l);}
    }
}