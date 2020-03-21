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


  byId(req, res) {
    CasesService.byId(req.params.id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
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
