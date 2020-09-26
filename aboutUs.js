$(document).ready(function () {
  $(".carousel").carousel();
  $('.sidenav').sidenav();

  var profileInfo = {
    team: {
      name: "Meet Our Team",
      blurb:
        "We are a varied group of UW Full Stack Coding Bootcamp students. From musicians, to barkeeps, to engineers, to builders, we are collectively taking these pandemic times by the horns and choosing to learn the powerful art of coding!",
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
      blurb: "I am a momager, a Financial Manager, a runner, a dreamer. I am proud to be in the UW Bootcamp for Full Stack Developers, and am excited beyond measure to combine my new proficiencies with my well established expertise to launch my career to new heights! Please follow my links and get to know me more.",
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
      blurb: "I am a musician, a mathematician, and the Concept Creator of this project. I am thrilled to work with this team to further my coding skills and bring this idea to life.",
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
      blurb: "I am a wizard with this coding biz already, and can get you out of many sticky situations. Hire me now! And I have a kid.",
      gitHubLink: {
        url: "https://github.com/webermg",
        linkLable: "Matt's Github",
      },
      personalSite: {
        url: "#",
        linkLable: "",
      },
      linkedInLink: {
        url: "#",
        linkLable: "Matt's LinkedIn",
      },
    },

    petar: {
      name: "Petar Zivkovic",
      blurb: "I have been in construction for years, am always eager to help, and can not WAIT to move into a new career in coding.",
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
      blurb: "I am an artist who lives at the best beach in the Northwest, and love a good challenge. I also make a mean cocktail, but can't wait to be a developer instead.",
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
        linkLable: "Scott's LinkedIn",
      },
    },
  };

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
