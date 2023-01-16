using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using OpenQA.Selenium.Remote;

namespace FlowCardTesting
{
    internal class Program
    {
        //Create the reference for our browser
        IWebDriver driver = new ChromeDriver();

static void Main(string[] args)
        {
        }
        [SetUp]
        public void initialize()
        {
            //Navigate to 366Pi Page
            driver.Navigate().GoToUrl("https://flocard.app/");
            driver.Manage().Window.Maximize();
        }


        [Test]

        public void impact_0()
        {
            IWebElement sDGs = driver.FindElement(By.XPath("//*[@id=\'navBar\']/div/ul/li[1]/a"));
            sDGs.Click();
        }

        [Test]

        public void iS_0()
        {
            IWebElement iS = driver.FindElement(By.XPath("//*[@id=\'navBar\']/div/ul/li[2]/a"));
            iS.Click();
        }

        [Test]

        public void knowledge_0()
        {
            IWebElement knowledge = driver.FindElement(By.XPath("//*[@id=\'navBar\']/div/ul/li[3]/a"));
            knowledge.Click();
        }

        [Test]

        public void contact_0()
        {
            IWebElement contact = driver.FindElement(By.XPath("//*[@id=\'navBar\']/div/ul/li[4]/a"));
            contact.Click();
            IWebElement firstname = driver.FindElement(By.XPath("//*[@id=\'firstName\']"));
            firstname.SendKeys("Siddharth");
            IWebElement lastname = driver.FindElement(By.XPath("//*[@id=\'lastName\']"));
            lastname.SendKeys("Gautam");
            IWebElement email = driver.FindElement(By.XPath("//*[@id=\'emailAddress\']"));
            email.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement message = driver.FindElement(By.XPath("//*[@id=\'message\']"));
            message.SendKeys("Mission Accomplished");
        }

        [Test]

        public void about_0()
        {
            IWebElement about = driver.FindElement(By.XPath("//*[@id=\'navBar\']/div/ul/li[5]/a"));
            about.Click();
        }

        [Test]

        public void partner_0()
        {
            IWebElement partner = driver.FindElement(By.XPath("//*[@id=\'navBar\']/div/ul/li[6]/a"));
            partner.Click();
        }

        [Test]

        public void get_started_0()
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement googleLink = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[1]/span"));
            googleLink.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'identifierId\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement next = driver.FindElement(By.XPath("//*[@id=\'identifierNext\']/div/button/span"));
            next.Click();
        }

        [Test]
        public void get_started_1()
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement linkedIn = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[2]/span"));
            linkedIn.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'username\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement password = driver.FindElement(By.XPath("//*[@id=\'password\']"));
            password.SendKeys("Siddharth@22");
            IWebElement signIn = driver.FindElement(By.XPath("//*[@id=\'app__container\']/main/div[2]/form/div[3]/button"));
            signIn.Click();
            IWebElement exchange = driver.FindElement(By.XPath("//*[@id=\'exchangemenu\']/a/span"));
            exchange.Click();
        }

        [Test]

        public void get_started_2() 
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement linkedIn = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[2]/span"));
            linkedIn.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'username\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement password = driver.FindElement(By.XPath("//*[@id=\'password\']"));
            password.SendKeys("Siddharth@22");
            IWebElement signIn = driver.FindElement(By.XPath("//*[@id=\'app__container\']/main/div[2]/form/div[3]/button"));
            signIn.Click();
            IWebElement exchange = driver.FindElement(By.XPath("//*[@id=\'exchangemenu\']/a/span"));
            exchange.Click();
            IWebElement exchangeC = driver.FindElement(By.XPath("//*[@id=\'lnkExchangeCodes\']/span[2]"));
            exchangeC.Click();
        }

        [Test]
        public void contact_01()
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement linkedIn = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[2]/span"));
            linkedIn.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'username\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement password = driver.FindElement(By.XPath("//*[@id=\'password\']"));
            password.SendKeys("Siddharth@22");
            IWebElement signIn = driver.FindElement(By.XPath("//*[@id=\'app__container\']/main/div[2]/form/div[3]/button"));
            signIn.Click();
            IWebElement contact01 = driver.FindElement(By.XPath("//*[@id=\'lnkContacts\']/span"));
            contact01.Click();
        }
        [Test] 
        public void FlowCard_0() 
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement linkedIn = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[2]/span"));
            linkedIn.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'username\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement password = driver.FindElement(By.XPath("//*[@id=\'password\']"));
            password.SendKeys("Siddharth@22");
            IWebElement signIn = driver.FindElement(By.XPath("//*[@id=\'app__container\']/main/div[2]/form/div[3]/button"));
            signIn.Click();
            IWebElement flow = driver.FindElement(By.XPath("//*[@id=\'lnkAddress\']/span"));
            flow.Click();
        }

        [Test] 
        public void planters_0() 
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement linkedIn = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[2]/span"));
            linkedIn.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'username\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement password = driver.FindElement(By.XPath("//*[@id=\'password\']"));
            password.SendKeys("Siddharth@22");
            IWebElement signIn = driver.FindElement(By.XPath("//*[@id=\'app__container\']/main/div[2]/form/div[3]/button"));
            signIn.Click();
            IWebElement planters = driver.FindElement(By.XPath("//*[@id=\'lnkPlanter\']/span"));
            planters.Click();
        }
        [Test]
        public void faq_0()
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement linkedIn = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[2]/span"));
            linkedIn.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'username\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement password = driver.FindElement(By.XPath("//*[@id=\'password\']"));
            password.SendKeys("Siddharth@22");
            IWebElement signIn = driver.FindElement(By.XPath("//*[@id=\'app__container\']/main/div[2]/form/div[3]/button"));
            signIn.Click();
            IWebElement faq = driver.FindElement(By.XPath("//*[@id=\'lnkFAQ\']/span"));
            faq.Click();
        }
        [Test] 
        public void flowCardP_0() 
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement linkedIn = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[2]/span"));
            linkedIn.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'username\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement password = driver.FindElement(By.XPath("//*[@id=\'password\']"));
            password.SendKeys("Siddharth@22");
            IWebElement signIn = driver.FindElement(By.XPath("//*[@id=\'app__container\']/main/div[2]/form/div[3]/button"));
            signIn.Click();
            IWebElement flowCardP = driver.FindElement(By.XPath("//*[@id=\'lnkPolicies\']/span"));
            flowCardP.Click();
        }

        [Test]
        public void support_0()
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement linkedIn = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[2]/span"));
            linkedIn.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'username\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement password = driver.FindElement(By.XPath("//*[@id=\'password\']"));
            password.SendKeys("Siddharth@22");
            IWebElement signIn = driver.FindElement(By.XPath("//*[@id=\'app__container\']/main/div[2]/form/div[3]/button"));
            signIn.Click();
            IWebElement support = driver.FindElement(By.XPath("//*[@id=\'lnkSupport\']/span"));
            support.Click();
            IWebElement name = driver.FindElement(By.XPath("//*[@id=\'NameLabel\']"));
            name.SendKeys("Siddharth Gautam");
            IWebElement email = driver.FindElement(By.XPath("//*[@id=\'EmailLabel\']"));
            email.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement phone = driver.FindElement(By.XPath("//*[@id=\'ContactLabel\']"));
            phone.SendKeys("9162221083");
            IWebElement description = driver.FindElement(By.XPath("//*[@id=\'message\']"));
            description.SendKeys("Mission Accomplished");
        }
        [Test]
        public void FlowCardG_0()
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement linkedIn = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[2]/span"));
            linkedIn.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'username\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement password = driver.FindElement(By.XPath("//*[@id=\'password\']"));
            password.SendKeys("Siddharth@22");
            IWebElement signIn = driver.FindElement(By.XPath("//*[@id=\'app__container\']/main/div[2]/form/div[3]/button"));
            signIn.Click();
            IWebElement flowCardG = driver.FindElement(By.XPath("//*[@id=\'lnkGuide\']/a/span"));
            flowCardG.Click();
            IWebElement createCard = driver.FindElement(By.XPath("//*[@id=\'newCardIntro\']/span[2]"));
            createCard.Click();
        }

        [Test] public void CreateCard_0() 
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement linkedIn = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[2]/span"));
            linkedIn.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'username\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement password = driver.FindElement(By.XPath("//*[@id=\'password\']"));
            password.SendKeys("Siddharth@22");
            IWebElement signIn = driver.FindElement(By.XPath("//*[@id=\'app__container\']/main/div[2]/form/div[3]/button"));
            signIn.Click();
            IWebElement createCard = driver.FindElement(By.XPath("//*[@id=\'new_card_id\']/div/div[1]/a/img"));
            createCard.Click();
            IWebElement fullName = driver.FindElement(By.XPath("//*[@id=\'txtName\']"));
            fullName.SendKeys("Siddharth Gautam ");
            IWebElement position = driver.FindElement(By.XPath("//*[@id=\'txtHeadline\']"));
            position.SendKeys("Intern");
            IWebElement phone = driver.FindElement(By.XPath("//*[@id=\'txtPhone\']"));
            phone.SendKeys("9162221083");
            IWebElement website = driver.FindElement(By.XPath("//*[@id=\'txtWebsite\']"));
            website.SendKeys("www.siddharthgautam.com");
            IWebElement facebookProfile = driver.FindElement(By.XPath("//*[@id=\'txtFacebook\']"));
            facebookProfile.SendKeys("www.facebook.com");
            IWebElement instaProfile = driver.FindElement(By.XPath("//*[@id=\'txtInstagram\']"));
            instaProfile.SendKeys("www.instagram.com");
            IWebElement twitterProfile = driver.FindElement(By.XPath("//*[@id=\'txtTwitter\']"));
            twitterProfile.SendKeys("www.twitter.com");
            IWebElement linkedinProfile = driver.FindElement(By.XPath("//*[@id=\'txtLinkedin\']"));
            linkedinProfile.SendKeys("www.linkedin.com");
            IWebElement tags = driver.FindElement(By.XPath("//*[@id=\'txtLinkedin\']"));
            tags.SendKeys("jobseekers");
            IWebElement createButton = driver.FindElement(By.XPath("//*[@id=\'content\']/div[1]/section/div/div/div[2]/div/div/form/div[12]/input"));
            createButton.Click();
        }

        [Test] 
        public void EditCard_0()
        {
            IWebElement getStarted = driver.FindElement(By.XPath("//*[@id=\'logoAndNav\']/nav/div/div[1]/a"));
            getStarted.Click();
            IWebElement linkedIn = driver.FindElement(By.XPath("//*[@id=\'content\']/div[2]/div/div/div/div/form/div/a[2]/span"));
            linkedIn.Click();
            IWebElement emailID = driver.FindElement(By.XPath("//*[@id=\'username\']"));
            emailID.SendKeys("siddharthgautam1981@gmail.com");
            IWebElement password = driver.FindElement(By.XPath("//*[@id=\'password\']"));
            password.SendKeys("Siddharth@22");
            IWebElement signIn = driver.FindElement(By.XPath("//*[@id=\'app__container\']/main/div[2]/form/div[3]/button"));
            signIn.Click();
            IWebElement optionsButton = driver.FindElement(By.XPath("//*[@id=\'dropDownUnFold\']/i"));
            optionsButton.Click();
            IWebElement Edit = driver.FindElement(By.XPath("//*[@id=\'connectionsDropdown1\']/div/a"));
            Edit.Click();
            IWebElement EditName = driver.FindElement(By.XPath("//*[@id=\'txtName\']"));
            EditName.SendKeys("Shiro");
            IWebElement EditPos = driver.FindElement(By.XPath("//*[@id=\'txtHeadline\']"));
            EditPos.SendKeys("Internship");
            IWebElement EditPhone = driver.FindElement(By.XPath("//*[@id=\'txtPhone\']"));
            EditPhone.SendKeys("6207211880");
            IWebElement EditWeb = driver.FindElement(By.XPath("//*[@id=\'txtWebsite\']"));
            EditWeb.SendKeys("www.shiro.com");
            IWebElement EditFb = driver.FindElement(By.XPath("//*[@id=\'txtFacebook\']"));
            EditFb.SendKeys("www.fb.com");
            IWebElement EditInsta = driver.FindElement(By.XPath("//*[@id=\'txtInstagram\']"));
            EditInsta.SendKeys("www.insta.com");
            IWebElement EditTwitter = driver.FindElement(By.XPath("//*[@id=\'txtTwitter\']"));
            EditTwitter.SendKeys("www.twit.com");
            IWebElement Editlinkedin = driver.FindElement(By.XPath("//*[@id=\'txtLinkedin\']"));
            Editlinkedin.SendKeys("www.l.com");
            IWebElement EditTag = driver.FindElement(By.XPath("//*[@id=\'content\']/div[1]/section/div/div/div/div/form/div[12]/div/tags/span"));
            EditTag.SendKeys("homeoffice");
            IWebElement updateCard = driver.FindElement(By.XPath("//*[@id=\'content\']/div[1]/section/div/div/div/div/form/div[13]/div/input[2]"));
            updateCard.Click();


        }
    }
}

