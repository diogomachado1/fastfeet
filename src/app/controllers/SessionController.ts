import UserServices from '../Services/UserServices';

class SessionController {
  async store(req, res) {
    const response = await UserServices.createSession(req.body);

    return res.json(response);
  }
}
export default new SessionController();
