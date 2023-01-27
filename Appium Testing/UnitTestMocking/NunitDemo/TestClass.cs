using ArithmeticOperations;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assert = NUnit.Framework.Assert;
using Moq;
namespace NunitDemo
{
    [TestFixture]
    public class TestClass
    {
        public  int i = 10, j = 20;

        [Test]
        public void TestSum()
        {
            Arithmetic ar = new Arithmetic();
            Assert.AreEqual(30, ar.sum(i, j));
        }

        [Test]
        [TestCase(10,5,5)]

        public void TestSubtract(int a, int b, int expected)
        {
            Arithmetic ar = new Arithmetic();
            Assert.AreEqual(expected , ar.sub(a,b));
        }

        [Test]
        [Ignore("Not Implemented yet")]
        public void TestMultiply()
        {

        }
        [Test]
        
        public void CheckValues()
        {
            Mock<Arithmetic> mock = new Mock<Arithmetic>();
            mock.Setup(x => x.checkDigitsOnly()).Returns(true);
            Arithmetic ar = new Arithmetic();
            Assert.AreEqual(true, mock.Object.checkDigitsOnly());
        }
        
    }
}
