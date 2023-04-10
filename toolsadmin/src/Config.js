
/*

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
export const csrftoken = getCookie('csrftoken');

*/
export const config = {
    // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: '/dashboard/default',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    //API_SERVER: 'http://pod-rca-api-udashboard-api-staging.apps.ilocpaiops403.ocpd.corp.amdocs.com/api'
    API_SERVER: 'http://127.0.0.1:8000/api',
    requestOptions:  {
        method: "GET",
      //  'X-CSRFToken': csrftoken,     
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
       }
    }
};
