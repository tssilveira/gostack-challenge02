import * as Yup from 'yup';
import Destinatario from '../models/Destinatario';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  rua: Yup.string().required(),
  numero: Yup.number().required(),
  complemento: Yup.string().required(),
  estado: Yup.string()
    .required()
    .max(2)
    .min(2),
  cidade: Yup.string().required(),
  cep: Yup.string()
    .required()
    .max(10)
    .min(8)
});

class DestinatarioController {
  async store(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const destExists = await Destinatario.findOne({
      where: { name: req.body.name }
    });

    if (destExists) {
      return res.status(400).json({ error: 'Destinario already exists!' });
    }

    const {
      id,
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep
    } = await Destinatario.create(req.body);

    return res.json({
      id,
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep
    });
  }

  async update(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.body;

    const dest = await Destinatario.findByPk(req.id);

    if (name && name !== dest.name) {
      const destExists = await Destinatario.findOne({ where: { name } });

      if (destExists) {
        return res.status(400).json({ error: 'Destinatario already exists' });
      }
    }

    const {
      id,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep
    } = await dest.update(req.body);

    return res.json({
      id,
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep
    });
  }
}

export default new DestinatarioController();
