using ArithmeticOperations;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace UnitTestMocking
{
    [TestClass]
    public class testClass
    {
        public int i = 10 , j = 20 ;
        [TestMethod]
        public void testSum()
        {
            Arithmetic ar = new Arithmetic();
            Assert.AreEqual(35, ar.sum(i,j));
        }
    }
}
