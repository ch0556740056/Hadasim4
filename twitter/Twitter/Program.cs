using System;

namespace Twitter
{
    class Program
    {
        public static void PrintPyramid(int lenght,int width)
        {
            int numCocav = 1, numRevach = (width - numCocav) / 2,division=((lenght-2)/((width-3)/2)),
                remainder= division+((lenght - 2) % ((width - 3) / 2)), count=0;
            for (int i = 1; i <= lenght; i++)
            {
               
                for (int space = 1; space <= numRevach; space++)
                {
                    Console.Write(" ");
                }

                // Print stars (number of stars = 2 * current row - 1)
                for (int star = 1; star <= numCocav; star++)
                {
                    Console.Write("*");
                }
                count++;
                if((count==division&& numCocav!=3)|| (numCocav==1&&count==1) || 
                    (numCocav ==width && count == 1) || (count == remainder && numCocav == 3))
                {
                    numCocav += 2;
                    numRevach -= 1;
                    count = 0;
                }
                // Move to the next line
                Console.WriteLine();
            }
        }
        static void Main(string[] args)
        {
            int ChoiceNumber = 0,trigleChoice=0;
            int height = 0, width = 0;
            do
            {
                // הצגת התפריט
                Console.WriteLine("----- MENU -----");
                Console.WriteLine("for a rectangle pyramid press 1");
                Console.WriteLine("for a triangular pyramid press 2");
                Console.WriteLine("for EXIT press 3");

                // קבלת בחירה מהמשתמש
                Console.Write("choose option: ");
                ChoiceNumber = int.Parse(Console.ReadLine());

                // ביצוע פעולה לפי בחירה
                switch (ChoiceNumber)
                {
                    case 1:
                        Console.WriteLine(" 1");
                        do
                        {
                            Console.WriteLine("enter width and height");
                            width = int.Parse(Console.ReadLine());
                            height = int.Parse(Console.ReadLine());
                        }
                        while (width <= 0 || height <= 0 || height < 2);
                        if (Math.Abs(width - height) > 5)
                        {
                            Console.WriteLine($"The area of ​​the rectangle is:{height * width} ");
                        }
                        else
                        {
                            Console.WriteLine($"The perimeter of the rectangle is: {(height + width) * 2}");
                        }
                        break;
                    case 2:
                        Console.WriteLine("2");
                        do
                        {
                            Console.WriteLine("enter width and height");
                            width = int.Parse(Console.ReadLine());
                            height = int.Parse(Console.ReadLine());
                        }
                        while (width <= 0 || height <= 0 || height < 2);
                        do
                        {
                            Console.WriteLine("----- MENU -----");
                            Console.WriteLine("Print the perimeter of the triangle press 1");
                            Console.WriteLine("Print the triangle press 2");
                            trigleChoice = int.Parse(Console.ReadLine());

                        } while (trigleChoice != 1 && trigleChoice != 2);
                        switch (trigleChoice)
                        {
                            case 1:
                                double d = Math.Sqrt(Math.Pow(width / 2, 2) + Math.Pow(height, 2));
                                Console.WriteLine($"the perimeter of the triangle is: {d+d+width}");
                                break;
                            case 2:
                                if (width % 2 == 0 || width > 2 * height)
                                {
                                    Console.WriteLine("we can't print triangular");
                                }
                                else
                                {
                                    PrintPyramid(height, width);
                                }
                                break;
                        }
                        break;
                    case 3:
                        Console.WriteLine("EXIT");
                        break;
                    default:
                        Console.WriteLine("no possible.");
                        break;
                }

                // ניקוי קונסולת הפלט
                Console.WriteLine();

            } while (ChoiceNumber != 3); // יציאה מהלולאה כאשר המשתמש בוחר 3
          
        }

      
    }
    
}
