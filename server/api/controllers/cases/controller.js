import CasesService from '../../services/cases';

export class Controller {
  all(req, res) {
    CasesService.all().then(r => res.json(r));
  }

  brief(req, res) {
    CasesService.brief().then(r => res.json(r));
  }

  latest(req, res) {
    const { iso, onlyCountries } = req.query;

    CasesService.latest(iso, onlyCountries).then(r => res.json(r));
  }


  timeseries(req, res) {
    const { iso, onlyCountries } = req.query;

    CasesService.timeseries(iso, onlyCountries).then(r => res.json(r));
  }


  selfUpdate(req, res) {
    const { secret } = req.query;
    if (!secret) return res.status(401).json({ message: 'parameter is missing' }).end();
    CasesService.selfUpdate(secret).then(
      r => res.status(404).end(),
      err => res.status(404).json({ message: err }).end()
    );
  }


  byId(req, res) {
    CasesService.byId(req.params.id).then(result => {
      if (result) res.json({ message: result }).end();
    }, err => {
      res.status(404).json({ message: err }).end();
    });
  }

  create(req, res) {
    CasesService.create(req.body.name).then(r =>
      res
        .status(201)
        .location(`/api/v1/cases/${r.id}`)
        .json(r)
    );
  }
}
export default new Controller();
