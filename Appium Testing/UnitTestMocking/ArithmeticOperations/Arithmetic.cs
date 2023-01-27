using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArithmeticOperations
{
    public class Arithmetic
    {
        public int sum(int x , int y)
        { return x + y; }
        public  int sub(int x , int y)
        { return x - y; }
        public  double multiply(double x , double y)
        { return x * y; }
        public virtual bool checkDigitsOnly()
        { return false; }
    }
}
