import React, { useEffect } from 'react'
import '../../index.scss'
import { AppFrame, Menu } from '../../components'
import { APP_TITLE } from '../../const'

const Err404 = () => {
  // Устанавливаем заголовок окна
  useEffect(() => {
    document.title = APP_TITLE + '.'
  }, [])
  return (
    <>
      <Menu />
      <AppFrame
        head1='Страница не найдена'
        head2='Ошибка 404.'
        image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD6UlEQVR4nO2YW2gcVRiA1zuiIkpBfBB8EARBBYW++BCRureZibESVGpKrGhQTNSCD7EPa0OoIl5oTRMnM3Nms1skRAxpK5nNzjmzbW1roonUmKSxRtOtaRqySWozM5tbs7+cpRubdDd7yd4e8sMHhz2ccz7Obf8zFstmFEkEGkru9ou2CkqHWHqPpZgi4Cq5FSNmoPdwpUGhZfqbpVhClZw1Pe0VOsx4gNLTvtPAyPGepRjih0bmPoyYWX30a4AZbxQjeBCwxOgBnt1SaD8LkTlhEFfPxeRiDOJ354lcKhRUDkv2x4jMhhcnxFVylMUJCYjMmSrveLxggprMngr+vGd5rVwMWqfJXE9B5Hyio+zEoe16ZKolrhwlMu2BH799SVebbS/kVa6trfx2InPjU8OfJZSLMT38ORDETHTut9+RN0EsOff0HXldTyYXo/fILoO2yY+c8NwDRGIMM3hw9aGYbIHZC1IUWr6+LvxPE2DEGApvezDngkTmWoePfzC/dpaUjnrY+iwXhZbX1v9x7P0F2jancgpve0pzc+GlSQTpCi5NyqC1lJo+wbo1J3IAlps0mft1rO/jSLx9piQRpIz1uSJE5vppX1kX7BKcr51qfVmPTMc/CEoKgrTt6dZXdFW078iq3Okvyu/EiAldPvdlwpOqpCBI+XfkKyCIneryPH9X1gSxxO77rfNNY72rRElRkHKms8rEknNfVuR8yPoQRow5N/YNZEtw/mIzYOQ0lSbbwxsWJDJ7dOTkh4vJLmMlDUEK7VOT2aMbkusSHM8EPGXm1ZAbsi24HHLDMW+Z4eftJRnJuVyumwnizl7qr497rWxUEGa8MNFfD0Rm/2xrK78lg9lzVv303avX0vjcCMKMF7q/36FjwVmVlhx9lWHEXr7y1/6UB1IyFJz9+wB9HlxR+W33piyIEXtgwP+OmeogQBOCcRnGzjZFoeV02v7ufztMx0xJzidYH8GICS9cEtIaBDbAwrhAc8awItoeTSpIEBcY7a5dSneQ5SlPdGl9h+uj5XTbj3bXXtXcXGBdOZW3bTvufdFcDiVO4xOBmmtX9qAsfJR2e/p0OHFou6EKVntcOfolgCB2NDT0aUbLtHdv9YpgXV11Rn1MDn5Cr50LvfzTt904eyK7u6e9Yt3/2/U4P9AIu96qhDeqKiE42JjxfvylY6ehio7daw/G/Rgxun6+IW8HAxJgBBvo82D1VwniZsUhreaGNL5QDGk189TpuuV1zNEMo9BicI25izyokjO8IqjJ7Mj4mbpIomw5n0SmvUBdNDd37v89KFmfpKfHL9ihGCCICWLB/kTSS3szNsOS+/gPtKCzDTZJL8sAAAAASUVORK5CYII='
      ></AppFrame>
    </>
  )
}
export default Err404
