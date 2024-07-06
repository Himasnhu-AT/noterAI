module.exports = {
    title: "NoterAI - devdocs",
    description: "DevDocs of NoterAI",
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Github", link: "https://github.com/Himasnhu-AT/NoterAI" }
        ],
        sidebar: [
            {
                text: "Getting Started",
                items: [
                    { text: "Home", link: "/" },
                    { text: "Installation", link: "/installation" },
                ]
            },
            {
                text: "Development",
                items: [
                    { text: "Development", link: "/usage" },
                    { text: "Contributing", link: "/contributing" },
                ]
            }
        ]
    }
};