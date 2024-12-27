public class Main {
    public static void main(String[] args) {
        // String Creation
        String str1 = "Hello, ";
        String str2 = new String("World!");

        // Concatenation
        String str3 = str1 + str2; // Using + operator
        String str4 = str1.concat(str2); // Using concat() method

        // Comparison
        boolean areEqual = str1.equals(str2); // equals()
        boolean areEqualIgnoreCase = str1.equalsIgnoreCase(str2); // equalsIgnoreCase()
        int comparison = str1.compareTo(str2); // compareTo()

        // Length
        int length = str3.length(); // length()

        // Substring
        String substring = str3.substring(7, 12); // substring()

        // Character Retrieval
        char charAt = str3.charAt(0); // charAt()

        // Case Conversion
        String upperCase = str3.toUpperCase(); // toUpperCase()
        String lowerCase = str3.toLowerCase(); // toLowerCase()

        // Trimming
        String strWithSpaces = "  Hello World!  ";
        String trimmedStr = strWithSpaces.trim(); // trim()

        // Replacing
        String replacedStr = str3.replace("World", "Java"); // replace()

        // Splitting
        String[] splitStr = str3.split(","); // split()

        // Index Finding
        int firstIndex = str3.indexOf("o"); // indexOf()
        int lastIndex = str3.lastIndexOf("o"); // lastIndexOf()

        // Output all results
        System.out.println("Concatenation (using +): " + str3);
        System.out.println("Concatenation (using concat()): " + str4);
        System.out.println("Are str1 and str2 equal? " + areEqual);
        System.out.println("Are str1 and str2 equal (ignoring case)? " + areEqualIgnoreCase);
        System.out.println("Comparison of str1 and str2: " + comparison);
        System.out.println("Length of concatenated string: " + length);
        System.out.println("Substring from index 7 to 12: " + substring);
        System.out.println("Character at index 0: " + charAt);
        System.out.println("Uppercase: " + upperCase);
        System.out.println("Lowercase: " + lowerCase);
        System.out.println("Trimmed string: '" + trimmedStr + "'");
        System.out.println("Replaced string: " + replacedStr);
        System.out.println("Split string by comma: ");
        for (String s : splitStr) {
            System.out.println(s);
        }
        System.out.println("First occurrence of 'o': " + firstIndex);
        System.out.println("Last occurrence of 'o': " + lastIndex);
    }
}
