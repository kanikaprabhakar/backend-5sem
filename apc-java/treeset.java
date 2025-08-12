import java.util.*;
class treeset{
    public static void main(String[] args) {
        TreeSet t = new TreeSet<>(new m());
        t.add(12);
        t.add(90);
        t.add(9);
        System.out.println(t);

    }
    
}
class m implements Comparator{
    public int compare(Object o1, Object o2){
        Integer i1 = (Integer)o1;
        Integer i2 = (Integer)o2;
        if(i1>i2){
            return -1;
        }
        else if(i1<i2){
            return 1;
        }
        return 0;
    }
}