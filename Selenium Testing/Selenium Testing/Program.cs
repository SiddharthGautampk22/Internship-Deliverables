using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium_Testing
{
    internal class Program
    {
        //Create the reference for our browser
        IWebDriver driver = new ChromeDriver();

        static void Main(string[] args)
        {
           
        }
        [SetUp]
        public void Initialize()
        {
            //Navigate to 366Pi Page
            driver.Navigate().GoToUrl("https://366pi.tech/");
            driver.Manage().Window.Maximize();
        }
        [Test]
        public void ExecuteTest_1()
        {
            //Find the XPath
            IWebElement serviceS = driver.FindElement(By.XPath("//*[@id=\'menu-item-3907\']/a"));
            //Perform Ops
            serviceS.Click();
            IWebElement beSpoke = driver.FindElement(By.XPath("//*[@id=\'menu-item-1797\']/a"));
            beSpoke.Click();
        }


        [Test]
        public void ExecuteTest_2()
        {
            //Find the XPath
            IWebElement serviceS = driver.FindElement(By.XPath("//*[@id=\'menu-item-3907\']/a"));
            //Perform Ops
            serviceS.Click();
            IWebElement digitalW = driver.FindElement(By.XPath("//*[@id=\'menu-item-1650\']/a"));
            digitalW.Click();
        }

        [Test]
        public void ExecuteTest_3()
        {
            //Find the XPath
            IWebElement serviceS = driver.FindElement(By.XPath("//*[@id=\'menu-item-3907\']/a"));
            //Perform Ops
            serviceS.Click();
            IWebElement businessA = driver.FindElement(By.XPath("//*[@id=\'menu-item-1800\']/a"));
            businessA.Click();
        }

        [Test]

        public void ExecuteTest_4() 
        {
            //Find the XPath
            IWebElement serviceS = driver.FindElement(By.XPath("//*[@id=\'menu-item-3907\']/a"));
            //Perform Ops
            serviceS.Click();
            IWebElement dataAI = driver.FindElement(By.XPath("//*[@id=\'menu-item-1805\']/a"));
            dataAI.Click();
        }

        [Test]

        public void ExecuteTest_5()
        {
            //Find the XPath
            IWebElement serviceS = driver.FindElement(By.XPath("//*[@id=\'menu-item-3907\']/a"));
            //Perform Ops
            serviceS.Click();
            IWebElement blockChain = driver.FindElement(By.XPath("//*[@id=\'menu-item-842\']/a"));
            blockChain.Click();
            IWebElement blockChainC = driver.FindElement(By.XPath("//*[@id=\'menu-item-1770\']/a"));
            blockChainC.Click();
        }

        [Test]

        public void ExecuteTest_6()
        {
            //Find the XPath
            IWebElement serviceS = driver.FindElement(By.XPath("//*[@id=\'menu-item-3907\']/a"));
            //Perform Ops
            serviceS.Click();
            IWebElement blockChain = driver.FindElement(By.XPath("//*[@id=\'menu-item-842\']/a"));
            blockChain.Click();
            IWebElement blockChainD = driver.FindElement(By.XPath("//*[@id=\'menu-item-1773\']/a"));
            blockChainD.Click();
        }

        [Test]

        public void iP_1()
        {
            //Find the XPath
            IWebElement ipAndI = driver.FindElement(By.XPath("//*[@id=\'menu-item-3908\']/a"));
            //Perform Ops
            ipAndI.Click();
            IWebElement flowCard = driver.FindElement(By.XPath("//*[@id=\'menu-item-3909\']/a"));
            flowCard.Click();
        }

        [Test]

        public void iP_2()
        {
            //Find the XPath
            IWebElement ipAndI = driver.FindElement(By.XPath("//*[@id=\'menu-item-3908\']/a"));
            //Perform Ops
            ipAndI.Click();
            IWebElement DSMM = driver.FindElement(By.XPath("//*[@id=\'menu-item-4402\']/a"));
            DSMM.Click();
        }

        [Test]

        public void iP_3()
        {
            //Find the XPath
            IWebElement ipAndI = driver.FindElement(By.XPath("//*[@id=\'menu-item-3908\']/a"));
            //Perform Ops
            ipAndI.Click();
            IWebElement automobileAI = driver.FindElement(By.XPath("//*[@id=\'menu-item-3910\']/a"));
            automobileAI.Click();
        }

        [Test]

        public void iP_4()
        {
            //Find the XPath
            IWebElement ipAndI = driver.FindElement(By.XPath("//*[@id=\'menu-item-3908\']/a"));
            //Perform Ops
            ipAndI.Click();
            IWebElement iAD = driver.FindElement(By.XPath("//*[@id=\'menu-item-3911\']/a"));
            iAD.Click();
        }

        [Test]

        public void iP_5()
        {
            //Find the XPath
            IWebElement ipAndI = driver.FindElement(By.XPath("//*[@id=\'menu-item-3908\']/a"));
            //Perform Ops
            ipAndI.Click();
            IWebElement smartInventory = driver.FindElement(By.XPath("//*[@id=\'menu-item-3912\']/a"));
            smartInventory.Click();
        }

        [Test]

        public void iP_6()
        {
            //Find the XPath
            IWebElement ipAndI = driver.FindElement(By.XPath("//*[@id=\'menu-item-3908\']/a"));
            //Perform Ops
            ipAndI.Click();
            IWebElement jharkhand = driver.FindElement(By.XPath("//*[@id=\'menu-item-3913\']/a"));
            jharkhand.Click();
        }

        [Test]

        public void liveDigital_1()
        {
            //Find the XPath
            IWebElement liveDigital = driver.FindElement(By.XPath("//*[@id=\'menu-item-1822\']/a"));
            //Perform Ops
            liveDigital.Click();
            IWebElement mSP = driver.FindElement(By.XPath("//*[@id=\'menu-item-3914\']/a"));
            mSP.Click();
        }

        [Test]

        public void liveDigital_2()
        {
            //Find the XPath
            IWebElement liveDigital = driver.FindElement(By.XPath("//*[@id=\'menu-item-1822\']/a"));
            //Perform Ops
            liveDigital.Click();
            IWebElement fennex = driver.FindElement(By.XPath("//*[@id=\'menu-item-3916\']/a"));
            fennex.Click();
        }

        [Test]

        public void liveDigital_3()
        {
            //Find the XPath
            IWebElement liveDigital = driver.FindElement(By.XPath("//*[@id=\'menu-item-1822\']/a"));
            //Perform Ops
            liveDigital.Click();
            IWebElement iLead = driver.FindElement(By.XPath("//*[@id=\'menu-item-3915\']/a"));
            iLead.Click();
        }

        [Test]

        public void liveDigital_4()
        {
            //Find the XPath
            IWebElement liveDigital = driver.FindElement(By.XPath("//*[@id=\'menu-item-1822\']/a"));
            //Perform Ops
            liveDigital.Click();
            IWebElement microsite = driver.FindElement(By.XPath("//*[@id=\'menu-item-3851\']/a"));
            microsite.Click();
        }

        [Test]

        public void blog_0()
        {
            //Find the XPath
            IWebElement blog = driver.FindElement(By.XPath("//*[@id=\'menu-item-1539\']/a"));
            //Perform Ops
            blog.Click();
        }

        [Test]

        public void contact_0()
        {
            //Find the XPath
            IWebElement contact = driver.FindElement(By.XPath("//*[@id=\'menu-item-1527\']/a"));
            //Perform Ops
            contact.Click();
            IWebElement name = driver.FindElement(By.XPath("//*[@id=\'wpcf7-f1376-p1417-o1\']/form/p[1]/label/span/input"));
            name.SendKeys("Siddharth Gautam");
            IWebElement email = driver.FindElement(By.XPath("//*[@id=\'wpcf7-f1376-p1417-o1\']/form/p[2]/label/span/input"));
            email.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement use = driver.FindElement(By.XPath("//*[@id=\'wpcf7-f1376-p1417-o1\']/form/p[3]/label/span/input"));
            use.SendKeys("Laptop");
            IWebElement date = driver.FindElement(By.XPath("//*[@id=\'wpcf7-f1376-p1417-o1\']/form/p[4]/label/span/input"));
            date.SendKeys("22012023");
            IWebElement message = driver.FindElement(By.XPath("//*[@id=\'wpcf7-f1376-p1417-o1\']/form/p[5]/label/span/textarea"));
            message.SendKeys("Mission Accomplished.");
        }

        [Test]

        public void about_0()
        {
            //Find the XPath
            IWebElement about = driver.FindElement(By.XPath("//*[@id=\'menu-item-4385\']/a"));
            //Perform Ops
            about.Click();
            IWebElement careersAt366Pi = driver.FindElement(By.XPath("//*[@id=\'menu-item-4441\']/a"));
            careersAt366Pi.Click();

        }

        [TearDown]
        public void CleanUp()
        {
          //  driver.Close();
        }
    }
} 