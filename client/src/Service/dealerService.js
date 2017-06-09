/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/9/17.
 *
 * No license is granted for this project.
 */
import consts from './consts';

class DealerService {
  static getAllDealers() {
    return fetch(`${consts.API_URL}/dealers`)
      .then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
  }
}

export default DealerService;