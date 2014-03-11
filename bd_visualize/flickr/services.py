import fix_path
import endpoints

from service import flickr

app = endpoints.api_server([flickr.Api], restricted=False)