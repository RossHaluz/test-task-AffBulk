interface Props {
  label: string;
  heading: string;
  className?: string;
}

export const Container = (props: Props) => {
  const { label, heading, className } = props;

  console.log("heading", heading);

  const calculateFontSize = (string: string) => {
    const containerWidth = 360;
    const maxFontSize = 42;
    const minFontSize = 12;

    const canvas = document.createElement('canvas');
    const contex = canvas.getContext('2d');

    if(!contex) return maxFontSize;

    let low = minFontSize;
    let high = maxFontSize;
    let optimalSize = minFontSize;

    while(low <= high) {
      const mid = Math.floor((low + high) / 2);
      contex.font = `${mid}px Robot, sans-serif`;
      const metrics = contex.measureText(string);
      const textWidth = metrics?.width;

      if(textWidth <= containerWidth){
        optimalSize = mid;
      low = mid + 1;  
      } else {
       high = low - 1
      }
    }

    return optimalSize;
  }

  const fontSize = calculateFontSize(heading);

  return (
    <>
      <div className="label">{label}</div>
      <div className="container">
        <h1 className={className} style={{ fontSize: `${fontSize}px` }}>
          {heading}
        </h1>
      </div>
    </>
  );
};
