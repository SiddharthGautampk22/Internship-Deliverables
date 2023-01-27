using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Enums;
using OpenQA.Selenium.Appium.Interfaces;

namespace AppiumTesting
{
    public class Tests
    {
        private AppiumDriver<AndroidElement> driver;
        
        [SetUp]
        public void Setup()
        {
            var appPath = @"C:\Users\siddh\Downloads\google-fotos-6-20-0-502235862.apk";

            //Platform , device and application
            var driveroption = new AppiumOptions();
            driveroption.AddAdditionalCapability(MobileCapabilityType.PlatformName, "Android");
            driveroption.AddAdditionalCapability(MobileCapabilityType.DeviceName, "SiddharthPixel");
            driveroption.AddAdditionalCapability(MobileCapabilityType.App, appPath);
            driveroption.AddAdditionalCapability("chromedriverExecutable", @"C:\driver\chromedriver.exe");

            //Server Initialisation

            driver = new AndroidDriver<AndroidElement>(new Uri("http://localhost:4723/wd/hub"), driveroption );
           var contexts = ((IContextAware)driver).Contexts;
            //string webviewContext = null;
            //for(var i = 0;i<contexts.Count;i++)
            //{
            // Console.WriteLine(contexts[i]);
            //if (contexts[i].Contains("WEBVIEW"))
            //{
            //  webviewContext = contexts[i];
            // break;  
            // }
            // }
            // ((IContextAware)driver).Context = webviewContext;
            driver.FindElementByXPath("//android.widget.TextView[@content-desc=\'Photos\']").Click();
            driver.Close();



        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }
    }
}