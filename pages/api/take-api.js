async function tempo(request, response) {

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
    
    response.json({
        avatar: repos[0].owner.avatar_url,
        repos1: repos[0],
        repos1: repos[1],
        repos2: repos[2],
        repos3: repos[3],
        repos4: repos[4],
    });
}

export default tempo;