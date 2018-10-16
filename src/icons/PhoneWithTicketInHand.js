import React from "react";
import {Svg, G, Path, Polygon} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg {...rest} {...svgSize(height, width)} viewBox="0 0 36 38" version="1.1">
      <G stroke="none" strokeWidth="1" fill={fill} fillRule="evenodd">
        <Path d="M33.6174545,17.28 L34.4029091,17.28 C34.6385455,17.28 34.9003636,17.5156364 34.9003636,17.7512727 C34.9003636,18.0916364 34.6385455,18.3010909 34.4029091,18.3010909 L27.1505455,18.3010909 C26.8625455,18.3010909 26.6792727,18.0916364 26.6792727,17.7512727 C26.6792727,17.5156364 26.8625455,17.28 27.1505455,17.28 L27.936,17.28 L27.936,16.4945455 L28.9047273,16.6254545 L28.9047273,17.28 L32.6487273,17.28 L32.6487273,16.6254545 L33.6174545,16.4945455 L33.6174545,17.28 Z M34.9265455,3.168 L35.3716364,4.24145455 C35.5025455,4.55563636 35.5810909,5.00072727 35.5810909,5.34109091 L35.5810909,14.7665455 C35.5810909,15.2378182 35.2407273,15.5258182 34.7956364,15.6043636 C33.3294545,15.8923636 32.0727273,15.9970909 30.7636364,15.9970909 C29.4021818,15.9970909 28.1716364,15.8923636 26.7578182,15.6043636 C26.2865455,15.5258182 25.9723636,15.2378182 25.9723636,14.7665455 L25.9723636,5.34109091 C25.9723636,5.00072727 25.9723636,4.55563636 26.1032727,4.24145455 L26.5483636,3.168 C26.7054545,2.85381818 26.8887273,2.72290909 27.2552727,2.61818182 C28.3025455,2.33018182 29.1665455,2.22545455 30.24,2.19927273 L30.24,1.28290909 L28.3287273,1.28290909 C28.0145455,1.28290909 27.7789091,1.04727273 27.7789091,0.785454545 C27.7789091,0.471272727 28.0145455,0.235636364 28.3287273,0.235636364 L33.2509091,0.235636364 C33.5127273,0.235636364 33.7221818,0.471272727 33.7221818,0.785454545 C33.7221818,1.04727273 33.5127273,1.28290909 33.2509091,1.28290909 L31.3134545,1.28290909 L31.3134545,2.19927273 C32.3607273,2.22545455 33.1723636,2.33018182 34.2981818,2.61818182 C34.6123636,2.69672727 34.7956364,2.85381818 34.9265455,3.168 Z M27.5170909,13.824 C27.8836364,13.824 28.1454545,13.5883636 28.1454545,13.248 C28.1454545,12.8814545 27.8836364,12.5934545 27.5170909,12.5934545 C27.1767273,12.5934545 26.9149091,12.8814545 26.9149091,13.248 C26.9149091,13.5883636 27.1767273,13.824 27.5170909,13.824 Z M26.9410909,5.13163636 L26.9410909,11.4938182 C27.9883636,11.7556364 29.4021818,11.9650909 30.7636364,11.9650909 C32.1512727,11.9650909 33.5650909,11.7818182 34.56,11.4938182 L34.56,5.13163636 L26.9410909,5.13163636 Z M34.0887273,13.824 C34.4552727,13.824 34.7432727,13.5883636 34.7432727,13.248 C34.7432727,12.8814545 34.4552727,12.5934545 34.0887273,12.5934545 C33.7483636,12.5934545 33.5127273,12.8814545 33.5127273,13.248 C33.5127273,13.5883636 33.7483636,13.824 34.0887273,13.824 Z" />
        <Path d="M17.5861964,20.3016436 C17.5194327,20.2545164 17.4552873,20.2021527 17.3963782,20.1432436 L16.5899782,19.3368436 C16.5533236,19.29888 16.5363055,19.2491345 16.5048873,19.2085527 L15.1656873,19.2085527 L14.5019782,20.8121891 C15.0531055,20.8331345 15.4615418,21.2206255 15.4824873,21.2402618 C15.9917236,21.7508073 16.0532509,22.4040436 15.6644509,22.7915345 C15.2586327,23.1999709 14.6053964,23.1188073 14.0948509,22.6278982 C14.0725964,22.6082618 13.6864145,22.2207709 13.6654691,21.6290618 L11.6664873,22.4655709 C12.0526691,22.8936436 12.0526691,23.4447709 12.0526691,23.4657164 C12.0526691,24.1791709 11.6455418,24.7106618 11.0734691,24.7106618 C10.5027055,24.7106618 10.0942691,24.1791709 10.0942691,23.4657164 C10.0942691,23.4447709 10.0942691,22.8936436 10.5027055,22.4655709 L8.46183273,21.6290618 C8.46183273,22.2207709 8.07434182,22.6082618 8.05470545,22.6278982 C7.54416,23.1188073 6.89092364,23.1999709 6.48379636,22.7915345 C6.07405091,22.4040436 6.15783273,21.7508073 6.66706909,21.2402618 C6.68670545,21.2206255 7.07550545,20.8331345 7.64626909,20.8121891 L6.98125091,19.2085527 L4.50052364,19.2085527 L4.50052364,25.2212073 C4.50052364,25.5288436 4.74925091,25.77888 5.05819636,25.77888 L16.2718691,25.77888 C16.34256,25.5890618 16.4446691,25.4123345 16.5912873,25.2657164 L17.5861964,24.2694982 C17.5194327,24.22368 17.4552873,24.1700073 17.3950691,24.1110982 L16.5899782,23.3033891 C16.3229236,23.0363345 16.1749964,22.6802618 16.1749964,22.3019345 C16.1749964,21.9222982 16.3229236,21.5662255 16.5912873,21.2978618 L17.5861964,20.3016436 Z" />
        <Path d="M10.66608,23.4657164 C10.66608,23.8518982 10.8297164,24.1385891 11.0745164,24.1385891 C11.3193164,24.1385891 11.4829527,23.8518982 11.4829527,23.4657164 C11.4829527,23.4447709 11.4606982,22.9551709 11.0745164,22.7300073 C10.66608,22.9551709 10.66608,23.4447709 10.66608,23.4657164" />
        <Path d="M15.2581091,22.4040436 C15.4400727,22.2404073 15.3589091,21.9144436 15.0722182,21.6290618 C15.0538909,21.6081164 14.7056727,21.2821527 14.2566545,21.4038982 C14.1558545,21.8529164 14.4621818,22.2011345 14.4818182,22.2207709 C14.7672,22.5061527 15.0944727,22.56768 15.2581091,22.4040436" />
        <Polygon points="7.58893091 19.2080291 8.31940364 20.9543564 11.0737309 22.0985018 13.8293673 20.9543564 14.54544 19.2080291" />
        <Path d="M7.07511273,21.6286691 C6.78842182,21.9140509 6.70856727,22.2413236 6.87089455,22.4036509 C7.05416727,22.5672873 7.38013091,22.50576 7.64718545,22.2203782 C7.66682182,22.2007418 8.01373091,21.8525236 7.89067636,21.4048145 C7.42202182,21.28176 7.09605818,21.6077236 7.07511273,21.6286691" />
        <Path d="M5.02193455,3.27259636 L17.1270982,3.27259636 C17.7894982,3.27259636 18.3275345,3.81194182 18.3275345,4.47303273 L18.3275345,6.21805091 L3.82149818,6.21805091 L3.82149818,4.47303273 C3.82149818,3.81194182 4.35953455,3.27259636 5.02193455,3.27259636 M21.2729891,19.7056145 L20.9915345,19.42416 C20.7729164,19.2055418 20.4757527,19.13616 20.1929891,19.1806691 L21.2729891,18.09936 C21.9249164,17.4474327 21.9249164,16.3909964 21.2729891,15.73776 L21.2533527,15.7181236 C20.7467345,15.2115055 19.9246255,15.2115055 19.4166982,15.7181236 L17.4582982,17.6778327 C17.0969891,18.0391418 17.0969891,18.6269236 17.4582982,18.9895418 L18.2646982,19.7959418 C18.4833164,20.01456 18.78048,20.0839418 19.0645527,20.0394327 L17.4582982,21.6456873 C17.0969891,22.0083055 17.0969891,22.5947782 17.4582982,22.9573964 L18.2646982,23.7637964 C18.4833164,23.9824145 18.78048,24.0531055 19.0645527,24.0072873 L17.4582982,25.6122327 C17.0969891,25.9748509 17.0969891,26.5639418 17.4582982,26.9252509 L18.2646982,27.7316509 C18.5278255,27.9947782 18.9074618,28.0602327 19.2360436,27.9411055 L17.6481164,29.5303418 C17.2854982,29.8916509 17.2854982,30.4807418 17.6481164,30.8420509 L18.0552436,31.2491782 C17.8366255,31.5227782 17.5041164,31.6981964 17.1270982,31.6981964 L5.02193455,31.6981964 C4.35953455,31.6981964 3.82149818,31.16016 3.82149818,30.49776 L3.82149818,28.7527418 L17.3679709,28.7527418 C17.5460073,28.7527418 17.6952436,28.6061236 17.6952436,28.4254691 C17.6952436,28.2461236 17.5460073,28.0981964 17.3679709,28.0981964 L3.82149818,28.0981964 L3.82149818,6.87259636 L18.3275345,6.87259636 L18.3275345,15.5924509 L18.8105891,15.1093964 C19.0344436,14.8855418 19.3329164,14.7781964 19.6366255,14.7402327 L19.6366255,4.47303273 C19.6366255,3.08932364 18.5108073,1.96350545 17.1270982,1.96350545 L5.02193455,1.96350545 C3.63822545,1.96350545 2.51240727,3.08932364 2.51240727,4.47303273 L2.51240727,19.5275782 C2.12753455,19.2579055 1.57640727,19.0471418 0.915316364,19.2840873 C0.0840436364,19.5812509 -0.160756364,20.4531055 0.228043636,22.1732509 C0.618152727,23.8947055 0.458443636,26.4565964 0.0905890909,28.7710691 C-0.275956364,31.0868509 0.395607273,34.5245236 3.42222545,36.4436509 C6.77088,38.5669964 12.6722618,38.2357964 14.0926255,36.9280145 C15.2825891,35.8362327 16.6872436,34.2640145 17.4805527,32.9732509 C18.2725527,32.85936 18.9375709,32.3776145 19.3080436,31.7008145 C19.4206255,31.6563055 19.5253527,31.5882327 19.6143709,31.4979055 L21.0596073,30.0539782 C21.7115345,29.4007418 21.7115345,28.3443055 21.0596073,27.6923782 L20.9286982,27.56016 C20.6655709,27.2983418 20.2846255,27.2315782 19.9573527,27.3507055 L21.2729891,26.0350691 C21.9249164,25.3831418 21.9249164,24.3253964 21.2729891,23.6734691 L20.9915345,23.3920145 C20.7729164,23.1733964 20.4757527,23.1027055 20.1929891,23.1485236 L21.2729891,22.0672145 C21.9249164,21.4152873 21.9249164,20.3575418 21.2729891,19.7056145" />
        <Path d="M6.04472727,12.10896 L16.1050909,12.10896 C16.2844364,12.10896 16.4323636,11.9623418 16.4323636,11.7816873 C16.4323636,11.6010327 16.2844364,11.4544145 16.1050909,11.4544145 L6.04472727,11.4544145 C5.86407273,11.4544145 5.71745455,11.6010327 5.71745455,11.7816873 C5.71745455,11.9623418 5.86407273,12.10896 6.04472727,12.10896" />
        <Path d="M15.4831418,15.9486545 C15.4831418,15.4066909 15.0432873,14.9668364 14.5013236,14.9668364 L7.64823273,14.9668364 C7.10626909,14.9668364 6.66641455,15.4066909 6.66641455,15.9486545 C6.66641455,16.4906182 7.10626909,16.9304727 7.64823273,16.9304727 L14.5013236,16.9304727 C15.0432873,16.9304727 15.4831418,16.4906182 15.4831418,15.9486545" />
        <Path d="M6.04472727,10.5078109 L16.1050909,10.5078109 C16.2844364,10.5078109 16.4323636,10.3611927 16.4323636,10.1805382 C16.4323636,9.99988364 16.2844364,9.85326545 16.1050909,9.85326545 L6.04472727,9.85326545 C5.86407273,9.85326545 5.71745455,9.99988364 5.71745455,10.1805382 C5.71745455,10.3611927 5.86407273,10.5078109 6.04472727,10.5078109" />
      </G>
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.PhoneWithTicketInHand";