import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocumentV1 = YAML.load('./././src/config/swagger/v1.yaml');

const router = Router({ mergeParams: true });

const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: '/doc-v1',
        name: 'Spec1',
      },
    ],
  },
};

router.get('/doc-v1', (req, res) => {
  res.send(swaggerDocumentV1);
});

router.use('', swaggerUi.serve);
router.get('', swaggerUi.setup(null, swaggerOptions));

export default router;
