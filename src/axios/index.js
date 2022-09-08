import axios from 'axios';

const axiosSSR = axios.create({
    baseURL: 'http://13.38.55.250:8000',
    headers: { 
        'Content-type': 'application/json' 
    },
});

axiosSSR.interceptors.request.use(config => {
        if (!config.params) config.params = {}
        if(localStorage.getItem("token")) {
            config.headers = {
                'Content-type': 'application/json',
                "Authorization": `Token ${window.localStorage.getItem("token")}`
            }
        }
        return config; 
    }, error => Promise.reject(error) 
)

axiosSSR.interceptors.response.use(
    (res ) => ({ 
      error: null,
      data: res.data,
      
    }),
    (err) => ({
      error: {
        statusCode: err.response?.status || 0,
        message: err.message || 'An unexpected error has occurred',
      },
      data: null,
      
    })
  )

export default axiosSSR