

import {Surface} from 'react-360-web';
import { View } from 'react-360';

const cylinderSurface = new Surface(
    500,
    600,
    Surface.SurfaceShape.Cylinder
);

// cylinderSurface.renderToSurface(
//     cylinderSurface.createRoot('TourAppTemplate'),
//     cylinderSurface.getDefaultSurface(),
//     'default' /* optional, a name to reference the surface */
// );

module.exports = cylinderSurface;