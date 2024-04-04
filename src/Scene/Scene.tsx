import {ResiumScene} from './ResiumScene/ResiumScene'


export const Scene = ({
  className,
  assetId,
}: {
  className: string
  assetId: number
}) => {
  return (
    <div className={className}>
      <ResiumScene assetId={assetId}/>
    </div>
  )
}
