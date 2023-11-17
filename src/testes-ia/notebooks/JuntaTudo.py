import pandas as pd
import os

caminho_da_pasta = "06120018"  
lista_arquivos = os.listdir(caminho_da_pasta)

colunas_inuteis = ['bleedAcsBleedConfigStatus-1b','bleedAcsBleedConfigStatus-2b', 'bleedOutTemp-1a', 'bleedOutTemp-1b','bleedOutTemp-2a', 'bleedOutTemp-2b', 'bleedOutTempTarget-1a','bleedOutTempTarget-1b', 'bleedOutTempTarget-2b','bleedOverpressCas-1a', 'bleedSwPress-1a', 'bleedSwPress-1b','bleedSwPress-2a', 'bleedSwPress-2b', 'correctedCoreSpeed-1a','correctedCoreSpeed-3a', 'correctedN1Speed-1a', 'correctedN1Speed-3a','dateDay-1', 'dateMonth-1', 'dateYear-1', 'message0418DAA-1','message0422DAA-1', 'messageInhibitPhases-1','timeHours-1', 'timeMinutes-1','timeSeconds-1']

df = pd.DataFrame()
c = 0

def custom_mode(series):
    return series.mode().iloc[0] if not series.empty else None

for i in lista_arquivos:
    c+=1
    file = pd.read_parquet(f'06120018/{i}')
    file = file.drop(colunas_inuteis, axis=1)
    file = file.fillna(method='ffill')
    file = file.drop([0,1,2])
    classification_columns = ['aircraftSerNum-1', 'amscChBasHealthStatus-1b', 'amscChBasHealthStatus-1a', 'amscChBasHealthStatus-2b', 'amscHprsovDrivF-1a', 'amscHprsovDrivF-1b', 'amscHprsovDrivF-2b', 'amscPrsovDrivF-1a', 'amscPrsovDrivF-1b', 'amscPrsovDrivF-2b', 'basBleedLowPressF-1a', 'basBleedLowPressF-2b', 'basBleedLowTempF-1a', 'basBleedLowTempF-2b', 'basBleedOverPressF-1a', 'basBleedOverPressF-2b', 'basBleedOverTempF-1a', 'basBleedOverTempF-2b', 'bleedFavTmCmd-1a', 'bleedFavTmCmd-2a', 'bleedFavTmCmd-2b', 'bleedHprsovCmdStatus-1a', 'bleedHprsovCmdStatus-1b', 'bleedHprsovCmdStatus-2a', 'bleedHprsovCmdStatus-2b', 'bleedHprsovOpPosStatus-1a', 'bleedHprsovOpPosStatus-1b', 'bleedHprsovOpPosStatus-2a', 'bleedHprsovOpPosStatus-2b', 'bleedOnStatus-1a', 'bleedOnStatus-1b', 'bleedOnStatus-2b', 'bleedOverpressCas-2a', 'bleedOverpressCas-2b', 'bleedPrsovClPosStatus-1a', 'bleedPrsovClPosStatus-2a', 'bleedPrsovOpPosStatus-1a', 'bleedPrsovOpPosStatus-1b', 'bleedPrsovOpPosStatus-2a', 'bleedPrsovOpPosStatus-2b', 'bleedPrsovTmCmd-1a', 'bleedPrsovTmCmd-2a', 'bleedSingleOperation-1a', 'bleedSingleOperation-2b', 'phaseOfFlight-1', 'phaseOfFlightNavigation-1', 'sfyBasFaultWord1Bit13-1a', 'sfyBasFaultWord1Bit13-2b']
    
    DvarDF = file[classification_columns]
    CvarDF = file.drop(classification_columns, axis=1)

    DvarDF = DvarDF.astype(int)
    DvarDF['Grupo'] = (DvarDF.index // 20)

    DvarDF = DvarDF.groupby('Grupo').agg(custom_mode)

    CvarDF = CvarDF.drop(columns = 'recording_time', axis=1)
    CvarDF['Grupo'] = (CvarDF.index // 20)

    CvarDF = CvarDF.groupby('Grupo').mean()

    cleanFile = DvarDF.merge(CvarDF, left_index=True, right_index=True)

    cleanFile = cleanFile.reset_index(drop=True)

    if c == 1:
        df = cleanFile

    else:
        df = pd.concat([df,cleanFile], axis=0)
    
    print(f'Arquivo {c} de {len(lista_arquivos)}')

df['seconds'] = df.index

# Escreve o dataframe final em um único arquivo de extensão .parquet

df.to_parquet('06120018.parquet')