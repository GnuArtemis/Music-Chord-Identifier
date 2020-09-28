// prepare page for materialize functionality
$(document).ready(function () {
  $(".carousel").carousel();
  $(".sidenav").sidenav();
// Object array of our personal information to display in conjunction with pics
  var profileInfo = {
    team: {
      name: "Meet Our Team",
      blurb:
        "We are a varied group of UW Full Stack Coding Bootcamp students. From musicians, to barkeeps, to bankers, to engineers, to builders, we are collectively taking these pandemic times by the horns and choosing to learn the powerful art of coding!",
      gitHubLink: {
        url: "https://github.com/GnuArtemis/Music-Chord-Identifier",
        linkLable: "Github Link for project details",
      },
      personalSite: {
        url: "#",
        linkLable: "",
      },
      linkedInLink: {
        url: "#",
        linkLable: "",
      },
    },

    caitlin: {
      name: "Caitlin Bouroncle",
      blurb:
        "I am a momager, a Financial Manager, a runner, a dreamer. I am proud to be in the UW Bootcamp for Full Stack Developers, and am excited beyond measure to combine my new proficiencies with my well established expertise to launch my career to new heights! Please follow my links and get to know me more.",
      gitHubLink: {
        url: "https://github.com/caitlinbou",
        linkLable: "Caitlin's Github",
      },
      personalSite: {
        url: "https://caitlinbou.github.io/myPortfolio1/",
        linkLable: "Caitlin's Website",
      },
      linkedInLink: {
        url: "https://www.linkedin.com/in/caitlin-bouroncle-185b75182/",
        linkLable: "Caitlin's LinkedIn",
      },
    },

    ann: {
      name: "Ann Guinee",
      blurb:
        "I am a musician, a mathematician, and the Concept Creator of this project. I am thrilled to work with this team to further my coding skills and bring this idea to life.",
      gitHubLink: {
        url: "https://github.com/GnuArtemis",
        linkLable: "Ann's Github",
      },
      personalSite: {
        url: "https://gnuartemis.github.io/Personal-Website/",
        linkLable: "Ann's Website",
      },
      linkedInLink: {
        url: "https://www.linkedin.com/in/ann-guinee-b8186718b/",
        linkLable: "Ann's LinkedIn",
      },
    },

    matt: {
      name: "Matt Weber",
      blurb:
        "I'm a mechanical engineer turned programmer. The recent economic turmoil has given me an opportunity to make a career change and I look forward to making it happen.",
      gitHubLink: {
        url: "https://github.com/webermg",
        linkLable: "Matt's Github",
      },
      personalSite: {
        url: "#",
        linkLable: "",
      },
      linkedInLink: {
        url: "https://www.linkedin.com/in/matthew-weber-884a03122/",
        linkLable: "Matt's LinkedIn",
      },
    },

    petar: {
      name: "Petar Zivkovic",
      blurb:
        "I have a degree in Tourism with a focus on community building in conflict areas. Due to the suffering economy of Serbia, my home country, I moved to the Puget Sound in 2014 and have been a Foreman's Assistant for a construction company since. I am ready to bring my collaborative skills and work ethic to a new career in coding.",
      gitHubLink: {
        url: "https://github.com/Petar85",
        linkLable: "Petar's Github",
      },
      personalSite: {
        url: "#",
        linkLable: "",
      },
      linkedInLink: {
        url: "https://www.linkedin.com/in/petar-zivkovic-6b88ba1b3/",
        linkLable: "Petar's LinkedIn",
      },
    },

    scott: {
      name: "Scott Dancer",
      blurb:
        "I am an illustrator, cartoonist, and graphic designer. I live a great life on the Oregon coast, and find the creative art of coding equally rewarding as it is challenging. In my current career, I create unique and modern variations of classic cocktails. My new career as a full stack web developer is beckoning and everyday I learn new skills that will help me answer that call. ",
      gitHubLink: {
        url: "https://github.com/ScottDancer",
        linkLable: "Scott's Github",
      },
      personalSite: {
        url: "#",
        linkLable: "",
      },
      linkedInLink: {
        url: "#",
        linkLable: "https://www.linkedin.com/in/scott-dancer-9744091b2/",
      },
    },
  };
// function to display personalized text at same time as aboutUs pic
  $(".carousel").carousel({
    duration: 100,
    indicators: true,
    onCycleTo: function (data) {
      var id = data.id;
      if (id == data.id) {
        $(".profile").text(profileInfo[id].name);
        $(".blurb").text(profileInfo[id].blurb);
        $(".github").text(profileInfo[id].gitHubLink.linkLable);
        $(".github").attr("href", profileInfo[id].gitHubLink.url);
        $(".personalSite").text(profileInfo[id].personalSite.linkLable);
        $(".personalSite").attr("href", profileInfo[id].personalSite.url);
        $(".linkedin").text(profileInfo[id].linkedInLink.linkLable);
        $(".linkedin").attr("href", profileInfo[id].linkedInLink.url);
      }
    },
  });
});
