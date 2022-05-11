async function tempo(request, response) {
    const apiSecret = process.env.CONVERTKIT_API_SECRET;

    const gitResponse = await fetch(`https://api.github.com/users/takenet`);
    const gitResponseJson = await gitResponse.json();
    const avatar = gitResponseJson.avatar_url;

    var repositoriesResponse = await fetch(`https://api.github.com/orgs/takenet/repos`);
    var repositoriesResponseJson = await repositoriesResponse.json();
    var repos = repositoriesResponseJson.filter(function(repositorio){
        var lingua = repositorio.language;
        return lingua === "C#"
    }).sort(function(a,b){
        var dataUm = new Date(a.created_at);
        var dataDois = new Date(b.created_at);

        return dataUm.getTime() - dataDois.getTime();
    }).slice(0, 5);


    response.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');

    response.json({
        avatar: avatar,
        repos: repos

    });
}

export default tempo;