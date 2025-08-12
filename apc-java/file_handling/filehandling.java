import java.io.File;

public class filehandling {
    public static void main(String[] args) throws Exception{
        File f = new File("example.txt");
        System.out.println(f.exists());
        f.createNewFile();
        System.out.println(f.exists());

        File dir = new File("exampleDir");
        File f1 = new File(dir, "example.txt");
        dir.mkdir();
        f1.createNewFile();

        f.delete();
    }
}
