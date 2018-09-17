const routers = {
    name: "about",
    path: about,
    components: about,
    children: [{
        name: "index",
        path: index,
        components: index,
        children: [{
            name: user / user,
            path: user / user,
            component: user / user
        }]
    }]
}