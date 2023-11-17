# Documentação Modelo Preditivo - Grupo 2 flAI

## <img src="https://github.com/2023M7T2-Inteli/grupo2/assets/99221221/0a15c688-159e-40da-8ee1-b928f8419125" width="100" height="100"> <br> Grupo 2 - flAI

### Integrantes

Amanda Ribeiro Fontes, Emanuele Lacerda Morais Martins, Felipe Henrique Moreira Leão, Igor Scapin Francisco Garcia, Pablo Ruan Lana Viana, Paulo Presa Evangelista, Rafael Nissim Katalan

## Sumário

- [1. Introdução](#c1)
	- [1.1. Descrição do problema](#c11)
	- [1.2 Objetivos](#c12)
	- [1.3 Proposta de solução](#c13)
	- [1.4 Justificativa](#c14)
- [2. Contexto de Indústria](#c2)
	- [2.1 Entendimento de negócio](#c21)
		- [2.1.1 Canvas Proposta de Valor](#c211)
		- [2.1.2 Matriz de Riscos](#c212)
		- [2.1.3 Oceano Azul](#c213)
		- [2.1.4 Análise financeira](#c214)
	- [2.2 Mapeamento do Ciclo de Produção e Consumo](#c22)
		- [2.2.1 Requisitos de visualização](#c221)
		- [2.2.2 Matérias-primas, recursos, processos e impactos](#c222)
		- [2.2.3 Infográfico](#c223)
	- [2.3 Entendimento de Metadesign](#c23)
		- [2.3.1 Entendimento do problema](#c232)
		- [2.3.2 Possibilidades de reuso da solução apresentada](#c232)
- [3. Arquitetura da solução](#c3)
	- [3.1 Levantamento de requisitos](#c31)
		- [3.1.1 Requisitos Funcionais](#c311)
		- [3.1.2 Requisitos Não Funcionais](#c312)
	- [3.2 Estudo da Viabilidade Técnica](#c31)
		- [3.2.1 Estudo da viabilidade técnica](#c321)
		- [3.2.2 Comparação de processos para captura dos dados através de Benchmarks](#c322)
		- [3.2.3 Matriz de Decisão para as Tecnologias Selecionadas](#c323)
	- [3.3 Elementos gerais do solução ](#c33)
		- [3.3.1 Diagrama de blocos](#c331)
		- [3.3.2 Fluxo de uso da solução](#c332)
		- [3.3.3 Armazenamento dos dados ](#c333)
- [4. Desenvolvimento da solução](#c3)
	- [4.1 Modelagem da inteligência artificial](#c41)
		- [4.1.1 Formato dos dados](#c411)
		- [4.1.2 Análise exploratória](#c412)
		- [4.1.3 Pré-processamento](#c413)
		- [4.1.4 Insights obtidos a partir dos dados](#c414)
		- [4.1.5 Carregamento de dados](#c415)
		- [4.1.6 Estratégias para redução da dimensionalidade](#c416)
		- [4.1.7 Features e colunas de destaque](#c417)
		- [4.1.8 Utilização do autoIML para testes em diferentes modelos](#c418)
	- [4.2 Interface gráfica](#c42)
	- [4.3 Backend da aplicação](#c43)
		- [4.3.1 Rotas e caminho da aplicação](#c431)
		- [4.3.2 Banco de dados](#c432)
	- [4.4 Execução do projeto em ambiente de desenvolvimento](#c44)
- [5. Referências](#c5)
- [6. Anexos](#c6)

## <a name="c1"></a>1. Introdução

### <a name="c11"></a>1.1 Descrição do problema
### <a name="c12"></a>1.2 Objetivos

O objetivo deste projeto é desenvolver um sistema de previsão de falhas no sistema de bleed air das aeronaves Embraer E2 (modelo E190-400) operadas pela Azul Linhas Aéreas. Quando ocorre uma falha no sistema de bleed air, os computadores de bordo registram a ocorrência, e, em muitos casos, a aeronave pode ser autorizada para voar, desde que não ultrapasse o Flight Level 310 (nível de voo 310). Essa restrição operacional resulta em voos em altitudes mais baixas, o que acarreta em maior consumo de combustível e desgaste acelerado de componentes devido a fatores como a densidade e a resistência do ar. Portanto, o principal propósito deste projeto é identificar potenciais falhas no sistema de bleed air antes que ocorram, contribuindo para a prevenção de falhas em aeronaves e permitindo operações mais eficientes.

### <a name="c13"></a>1.3 Proposta de solução

Para alcançar os objetivos deste projeto, a proposta de solução envolve o desenvolvimento de um algoritmo de machine learning. Esse algoritmo terá a capacidade de identificar antecipadamente possíveis falhas no sistema de bleed air dos motores das aeronaves. Além disso, será criada uma dashboard que permitirá a realização de previsões em tempo real, bem como o acompanhamento do histórico de ocorrências.

### <a name="c14"></a>1.4 Justificativa

Optimização do consumo de combustível nas aeronaves Embraer E2, com o intuito de promover economia de recursos financeiros, tornar a Azul uma empresa mais sustentável e ecologicamente responsável.

## <a name="c2"></a>2. Contexto de Indústria

### <a name="c21"></a>2.1 Entendimento de negócio

#### <a name="c211"></a>2.1.1 Canvas Proposta de Valor

Canvas de Proposta de Valor é uma forma de ajudar criadores de solução a focar naquilo que é importante para o consumidor da solução, priorizando aquilo que gera valor ao produto final. A principal vantagem da proposta de valor apresentada é prever a necessidade de manutenção das Aeronaves para garantir o bom funcionamento do Bleed air dos motores.

<br>
<p align="center"><img src="https://github.com/2023M7T2-Inteli/grupo2/assets/99221221/e36fec29-9d33-415d-a9ef-53e90e75b702" width="70%" height="auto"></img></p>
<p align="center"><b>Figura 1 — Proposta de valor da solução</b></p>
<br>

#### <a name="c212"></a>2.1.2 Matriz de Riscos

A matriz de risco é uma das ferramentas que nos permite identificar, avaliar e priorizar os riscos associados ao projeto. É uma tabela que organiza os possíveis riscos em um ou mais eixos, e os classifica em termos de probabilidade e impacto. A partir dessa classificação, é possível determinar quais riscos precisam de atenção imediata e quais podem ser gerenciados com menos urgência. A utilização da matriz de riscos e oportunidades é fundamental para uma gestão eficiente de recursos de um projeto visto que ela possibilita a identificação, avaliação e mitigação de potenciais riscos e o mapeamento de oportunidades visando o crescimento da empresa.

<br>
<p align="center"><img src="https://github.com/2023M7T2-Inteli/flAI/blob/docs/documentos/images/Risk%20Heat%20Map%20by%20Erin.jpg?raw=true" width="70%" height="auto"></img></p>
<p align="center"><b>Figura 2 — Matriz de riscos da solução</b></p>
<br>

##### Riscos

1. Gastos muito elevados com a utilização da AWS
2. Modelo final apresentar baixa assertividade
3. Dificuldades da visualização dos resultados
4. Volume de dados ser tão massivo que dificulta o trabalho
5. Alterações causadas por possíveis falsas falhas momentâneas
6. Arquitetura da solução não atender as demandas
7. Dificuldade do entendimento dos componentes por dados inconsistentes com a realidade
8. Vazamento de dados após implementação do modelo
9. Modelo enviesado
10. Má manutenção do modelo

##### Mitigação de riscos

1. Estar bastante atento para não manter instâncias operantes desnecessariamente
2. Buscar o máximo possível de features que se correlacionam com o target
3. Utilização de técnicas de design para manter o usuário em primeiro plano
4. Operação com ferramentas de Big Data caso necessário
5. Atentar para descartar possíveis falhas
6. Manter a arquitetura sempre validada com os professores e orientador
7. Constituir constante contato com o parceiro para sanar dúvidas sobre os dados
8. Ter bastante atenção ao utilizar o projeto em rede
9. Utilizar ferramentas de auto-ML e analisar métricas de precisão e acurácia
10. Construir uma arquitetura e pipeline que permitam a sustentabilidade

##### Oportunidades

1. Maior competitividades no setor de aviação
2. Diminuição no impacto de emissão de carbono no setor de aviação
3. Possibilidade de ampliação de mercado atuante
4. Maior atratividade para investimentos
5. Possibilidade de gerar maior impacto social e econômico
6. Exploração do setor de análises de dados em Big Data
7. Venda desse serviço para outras empresas
8. Ampliação da malha aérea
9. Autonomia nos processos de manutenção preditiva
10. Aumento da possibilidade de parcerias externas

#### <a name="c213"></a>2.1.3 Oceano Azul

A matriz Oceano Azul é um conceito estratégico que visa auxiliar empresas a pensarem em como inovar diante do mercado que estão inseridas, seu principal objetivo é trazer clareza para o que está sendo feito na empresa e como ela pode se diferenciar dos seus atuais concorrentes ou melhorar a si própria realizando intervenções focadas em reduzir parametros negativos, elevar parametros positivos, eliminar impeditivos e criar oportunidades no setor. Considerando o contexto no qual a Azul está inserida foi pensado em alguns atributos para cada objetivo da Matriz.

<br>
<p align="center"><img src="https://github.com/2023M7T2-Inteli/flAI/blob/main/documentos/images/Apresenta%C3%A7%C3%A3o%20de%20Neg%C3%B3cios%20Plano%20de%20Neg%C3%B3cios%20Geom%C3%A9trico%20Corporativo%20Preto%20Laranja.png?raw=true" width="70%" height="auto"></img></p>
<p align="center"><b>Figura 3 — Matriz do oceano azul da solução</b></p>
<br>


#### <a name="c214"></a>2.1.4 Análise financeira
A análise financeria tem como o objetivo estimar valores aproximados para a implementação do projeto considerando seus principais custos e qunatidades. Dessa forma, para este projeto foram considerados como os principais custo o capital humano que seria utilizado para criação do modelo de manutenção prescritiva e todo o gerenciamento e tratamento dos dados recebido. Além disso, o  principal custo seria com infraestrutural e ferramentas para a realização projeto pensando em possibilidades escaláveis e efetivas para o uso empresarial. Assim, foram separados os principais fatores e valores atrelados a estes custos totalizando um valor final aproximado.

<br>
<p align="center"><img src="https://github.com/2023M7T2-Inteli/flAI/blob/main/documentos/images/AnaliseFinanceira.jpg?raw=true" width="70%" height="auto"></img></p>
<p align="center"><b>Figura 4 — Análise financeira da solução</b></p>
<br>

### <a name="c22"></a>2.2 Mapeamento do Ciclo de Produção e Consumo

#### <a name="c221"></a>2.2.1 Requisitos de visualização

Para uma melhor apresentação dos dados, pretende-se organizar as informações de acordo com o nível de **necessidade de manutenção**. Dessa forma, os elementos que se encontram próximos ao **limiar de operação aceitável** serão destacados em uma janela de alerta, indicando a urgência de reparos.

No intuito de proporcionar uma visualização clara, os dados serão representados através de gráficos que estabeleçam a **relação entre o número de voos e o grau de degradação dos componentes**. Isso permitirá identificar possíveis tendências ou padrões entre a frequência de voos e o desgaste dos elementos, auxiliando na tomada de decisões referentes à manutenção.

Por fim, a fim de aprimorar ainda mais a apresentação para os stakeholders, serão incorporados elementos visuais como cores diferenciadas para destacar diferentes níveis de necessidade, possibilitando uma rápida compreensão dos dados.

Tem em vista isso, algumas features foram elicitadas:

| Feature | Desenvolviemento |
|-------------|-------------|
| Alerta de máquinas / peças que estão na janela de antecipação de falha. | Painel que mostra maquinas na janela de antecipação de falhas com destaque para aquelas perto da do limiar de atividade. |
| Filtros por máquina para ver insights e gráficos inviduais atrelados ao desempenho da peça | Página para pesquisa o estado da máquina individualmente com gráficos de linhas mostrando a evolução do grau de degradação das peças |
| Gráfico de comparação entre máquinas para entender o desempenho comparados | Gráfico de linhas comparando as máquinas em que o modelo foi treinado para demonstrar aviões que mais necessitam de manutenção. |

#### <a name="c322"></a>2.2.2 Matérias-primas, recursos, processos e impactos

A aeronave que será trabalhada do projeto é a **Embraer E-Jets E2**, uma linha de aeronaves a jato bimotores desenvolvida pela companhia aeroespacial brasileira Embraer. Esse avião veio para substituir os E-Jets da segunda geração e, comparado com a primeira geração, **consome até 20% menos combustível por voo e emite 30% menos CO2 por passageiro** (“Embraer E-Jets E2”, 2023).

A área de atuação do projeto se concentra no sistema de **Bleed Air**. Esse sistema emprega uma rede complexa de dutos, válvulas e reguladores para canalizar ar de média a alta pressão, retirado da seção de compressão dos motores para várias localizações dentro da aeronave. Esse ar "sangrado" é então utilizado para uma variedade de funções cruciais, tais como sistemas de **pressurização, ar-condicionado, anti-gelo, partida do motor** (“Aircraft Bleed Air Systems”, 2021).

As **falhas no sistema de Bleed dos motores resultam em um maior consumo de combustível e necessidades por recursos naturais**. Quando essa falha é apresentada nos computadores de bordo, a aeronave ainda sim pode ser liberada para voo, desde que não voe acima do FL - Flight Level 310. Essa restrição operacional que resulta em voos com FL (Flight Level) mais baixos podem resultar em um maior consumo de combustível e desgaste de peças devido a fatores como a densidade e a resistência do ar.

As aeronaves do modelo Embraer A2 operam utilizando **querosene de aviação**, conhecido como Jet A-1, que é um derivado do petróleo submetido a rigorosos critérios físico-químicos durante seu processo de produção (“Querosene de Aviação | Petrobras”, [s.d.]). A queima desse combustível resulta na **emissão de diversos poluentes preocupantes**, incluindo monóxido e dióxido de carbono, hidrocarbonetos gasosos e óxidos de nitrogênio, que desempenham um papel significativo no **aquecimento global** (“Quais os impactos ambientais das viagens de avião? - eCycle”, 2013). Portanto, o aumento no consumo de combustível está diretamente ligado ao agravamento do nível de poluição proveniente da queima desses recursos. Além disso, especialistas da Azul destacam que o combustível representa de 40% a 60% dos custos operacionais, o que significa que o aumento no consumo também **impacta os custos de operação da companhia**.

A fuselagem da aeronave encontra-se concebida a partir da fundição conjunta de alumínio, cobre e titânio, conferindo-lhe propriedades mecânicas otimizadas, uma resistência à corrosão exemplar, exímia condutividade elétrica e térmica, e a capacidade de suportar flutuações de pressão atmosférica. Contudo, o desgaste proporcionado pelo maior arrasto do ar **deteriora mais rapidamente os componentes do avião**, necessitando de **maior extração de recursos naturais** caso não haja um processo de reciclagem eficiênte, podendo até evoluír para um caso de superexploção. Nesse estágio, fauna e florá ficam em risco de desaparecerem, e a vida selvagem de ser extinta. Com o desparecimento de florestas, os sumidouros de carbono também somem, aumentando a quantidade de toxicianas presentes no ar que a humanidade respira. Solos não degradados ficam cada ver mais raros, dificultando a agricultura e aumentando a fome no mundo (Quais são as consequências da superexploração dos recursos naturais? | Iberdrola). Portanto, o consumo excessivo de recursos naturais deve ser evitado.

Quando verificado a necessidade de manutenção em algum componente do sistema de Bleed Air, o avião é direcionado a oficina de **reparo e a restauração é coberta de acordo com o “Component Maintenance Manual (CMM)”**. O CMM descreve procedimentos passo a passo para realizar a manutenção correta de cada componente, incluindo desmontagem, inspeção visual e tolerâncias aceitáveis. Caso a peça seja encontrada com um grau de degradação muito elevado é necessário realizar o descarte em vez de manutenção. O que intensifica a importância na predição de componentes defeituosos, uma vez que a surpresa de uma peça impossibiltada de continuar na aeronave pode comprometer os planos da companhia, atrasando voôs, gerando custos e comprometendo a imagem da empresa.

Em resumo, a Embraer E-Jets E2 representa uma significativa evolução na aviação, priorizando a eficiência e a sustentabilidade. Porém, **requer atenção especial ao sistema de Bleed Air**, pois destaca a complexidade e relevância dos sistemas internos da aeronave. **Pequenas falhas nesse sistema podem acarretar efeitos consideráveis no desempenho e consumo de combustível**, ressaltando, assim, a importância da manutenção precisa e preventiva.

#### <a name="c223"></a>2.2.3 Infográfico

O propósito do infográfico é esclarecer o ciclo de produção, desde a participação inicial do parceiro até a concepção da solução desenvolvida. Foi elaborado com o intuito de proporcionar uma explicação simples e concisa da origem do problema e de como ele é efetivamente solucionado.

<br>
<p align="center"><img src="https://github.com/2023M7T2-Inteli/grupo2/assets/99221221/806c9f89-d581-42e8-a3ab-eade080fb1ef" width="70%" height="auto"></img></p>
<p align="center"><b>Figura 5 — Infográfico explicativo da solução</b></p>
<br>

### <a name="c23"></a>2.3 Entendimento do Metadesign

#### <a name="c231"></a>2.3.1 Entendimento do problema

O parceiro neste projeto é a Azul Linhas Aéreas Brasileiras, uma companhia aérea fundada em 2008 que se destaca por sua abrangente rede de voos nacionais e internacionais, oferecendo serviços de alta qualidade a preços acessíveis. A Azul opera uma frota moderna de aeronaves, incluindo modelos da Embraer. A aeronave central deste projeto é um dos modelos da Embraer, conhecido como E-Jets E2.

O enfoque do projeto recai sobre o sistema de Bleed Air. Este sistema emprega  rede de dutos, válvulas e reguladores para direcionar ar de média a alta pressão, retirado da seção de compressão dos motores, para várias áreas dentro da aeronave. Esse ar "sangrado" é então aproveitado para funções vitais, como pressurização da cabine, controle de temperatura, prevenção de acúmulo de gelo e partida dos motores.

Quando falhas ocorrem no sistema de Bleed Air dos motores, os aviões ainda podem ser autorizados para o voo, apesar de existir uma restrição operacional que impede voos acima do Flight Level (FL) 310. Essa limitação resulta em voos em altitudes mais baixas, o que pode acarretar em um consumo de combustível mais elevado e um desgaste maior dos componentes devido à resistência do ar e à densidade.

Em altitudes mais baixas, as aeronaves estão navegando por camadas de ar mais densas, o que intensifica a resistência aerodinâmica. Isso demanda que a aeronave empregue mais esforço para manter a mesma velocidade e altitude, resultando em um aumento no consumo de combustível. Além disso, a densidade do ar pode impactar o desempenho do motor, exigindo maior empuxo e, consequentemente, elevando o consumo de combustível.

Resumidamente, pequenas falhas no sistema de Bleed Air dos motores podem ter impactos significativos no desempenho e consumo de combustível, enfatizando a importância de uma manutenção precisa e preventiva desse sistema.

#### <a name="c232"></a>2.3.2 Possibilidades de reuso da solução apresentada

<h4><p>Demonstração das possibilidades de reuso da solução apresentada</p></h4>

<p>A partir da proposta de solução elaborada, foram mapeadas circunstâncias em que o produto final poderia ser reutilizado, de modo a fornecer suporte à área de manutenção preditiva da companhia aérea de forma contínua.</p>

<p><li><b>Plataforma web</b></p>
<p>A primeira possibilidade de reuso da solução identificada se relaciona à plataforma web através da qual o serviço de análise preditiva será acessado. Inicialmente, a plataforma destina-se a fornecer o suporte necessário para a realização da análise preditiva do sistema de Bleed Air de uma aeronave. Contudo, acredita-se que o parceiro de projeto possa escalar sua aplicabilidade, adotando o software para finalidades alternativas. A implementação de uma seção para gestão de ativos que requerem manutenção constante, por exemplo, poderia constituir uma nova finalidade para a plataforma.</p>

<p><li><b>Modelo de predição</b></p>

<p>O modelo preditivo desenvolvido pela equipe configura, também, uma possibilidade de reuso por parte da empresa parceira. Embora o modelo seja destinado à predição da necessidade de manutenção em componentes do sistema de Bleed Air de uma aeronave, acredita-se que ele poderia embasar a criação de novos modelos. Seria possível, por exemplo, modificar a estrutura do modelo a fim de que a finalidade da predição estivesse relacionada a outros sistemas que compõem uma aeronave.</p>

<p><li><b>Prestação de serviços de manutenção preditiva</b></p>

<p>Uma vez implementado o modelo, será possível analisar se a solução agregou valor ao parceiro. Caso a adoção do produto seja bem-sucedida, ela poderá ser replicada para além dos horizontes da Azul. Dessa forma, a companhia aérea poderia tornar-se provedora de serviços de análise preditiva destinada ao sistema de Bleed Air de aeronaves para seus clientes.</p>

## <a name="c3"></a>3. Arquitetura da solução
### <a name="c31"></a>3.1 Levantamento de requisitos


#### <a name="c311"></a>3.1.1 Requisitos Funcionais

A elaboração dos requisitos funcionais foi feita com base as dores dos clientes e suas princípais expectativas com o projeto. Eles tem como objetivo definir as principais funcionalidades do sistema.

| Critérios                                       | Descrição                                                                                                         |
|------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| **Acesso aos Dados por uma Plataforma Web**       | A solução deve permitir o acesso aos dados por meio de uma plataforma web, oferecendo facilidade de uso e acesso remoto. |
| **Input de Dados para Previsão de Problemas**    | A solução deve possibilitar a inserção dos dados de uma aeronave para prever problemas de durabilidade nos componentes do bleed. |
| **Acesso Exclusivo para Pessoas Autorizadas**   | A plataforma deve garantir que somente pessoas autorizadas tenham acesso, assegurando a segurança e a confidencialidade dos dados. |
| **Acesso à Documentação para Manutenção Prescritiva** | Deve ser disponibilizada uma plataforma exclusiva para pessoas autorizadas, permitindo a visualização da documentação do método de desenvolvimento do modelo para manutenções futuras. |
| **Visualização dos Usuários que Realizaram Previsões** | Os usuários devem poder visualizar as informações de quem utilizou a plataforma para realizar uma previsão, juntamente com os dados empregados. |
| **Graduação de Gravidade e Urgência do Problema** | Deve haver um sistema de graduação ou métrica que indique a gravidade e a urgência dos problemas previstos, auxiliando na priorização de ações. |
| **Destaque para Aeronaves com Maior Chance de Falha** | As aeronaves com a maior degradação devem ser apresentadas de forma destacada|
| **Intervalo Mínimo até a Falha do Componente**   | O intervalo até a falha prevista para um componente deve ser suficiente para haver tempo hábil para intervenções. |
| **Visualização de Dados em Formato de Gráficos**  | Os dados tratados devem ser visualizados por meio de gráficos, facilitando a compreensão e análise dos resultados. |
| **Segurança de Dados**                          | Todos os dados adicionados à plataforma devem ser protegidos e mantidos em segurança para evitar qualquer tipo de comprometimento. |

#### <a name="c312"></a>3.1.2 Requisitos Não Funcionais

Os requisitos não funcionais foram idelizados de forma a melhorar a experiência e os resultados do usuário na utilização do projeto de solução. Eles tem como objetivo descrever propriedades de qualidade gerais do sistema.

| Critérios                            | Descrição                                                                                          |
|-------------------------------------|----------------------------------------------------------------------------------------------------|
| **Previsão de Problemas no Sistema de Bleed** | A capacidade da solução de realizar previsões precisas e confiáveis sobre problemas no sistema de Bleed com base nos dados monitorados. |
| **Padrão na Estimativa de Gravidade** | A IA deve ser capaz de estimar a gravidade dos problemas de acordo com um padrão ou convenção estabelecida, facilitando a interpretação e a tomada de decisões. |
| **Exportação de Dados nos Padrões Atuais** | Os dados gerados pela solução devem ser exportados de maneira que estejam alinhados com os padrões de exportação utilizados atualmente pela organização. |
| **Fácil Manutenibilidade** | A solução deve ser projetada e implementada de forma a ser facilmente mantida e atualizada, com uma estrutura clara e documentação adequada. |
| **Segurança na Autenticação de Usuários** | Deve haver um sistema seguro de autenticação para garantir que apenas usuários autorizados tenham acesso à funcionalidade e aos resultados do modelo. |
| **Confiabilidade das Previsões** | O modelo de IA deve ser capaz de gerar previsões com acurácias relevantes para a análise prescritiva, de modo a fornecer informações úteis para a tomada de decisões informadas. |
| **Documentação do Processo** | Todo o processo, desde o desenvolvimento até a implementação, deve ser bem documentado para facilitar a manutenção contínua do código e a compreensão de sua evolução. |

### <a name="c32"></a>3.2 Estudo da viabilidade técnica

#### <a name="c321"></a>3.2.1 Estudo da viabilidade técnica
A realização de uma análise da viabilidade técnica envolve a avaliação de diversos aspectos para determinar se a implementação dessa solução é viável e benéfica para a sua situação específica.

##### Tecnologias utilizadas

Iniciando o processo, a construção de uma solução de manutenção preventiva requer a aplicação de recursos tecnológicos para sua concepção. Nesse contexto, são considerados diversos componentes, incluindo:

- Modelo de Aprendizado de Máquina: No contexto da manutenção preventiva, a capacidade de antecipar eventos futuros é crucial. Portanto, a adoção de um modelo de machine learning previamente treinado, capaz de identificar potenciais falhas, apresenta-se como uma escolha natural.

- Implementação de Pipelines: A preparação dos dados é uma etapa fundamental. O uso de pipelines possibilita o processamento estruturado dos dados, permitindo que estejam prontos para alimentar o modelo.

- Armazenamento de Dados Eficiente: A integração de armazenamento em nuvem associado às pipelines de processamento desempenha um papel vital na administração e acesso eficiente aos dados necessários.

##### Dados e recursos

- Qualidade dos Dados: A precisão da detecção de falhas depende diretamente da qualidade dos dados empregados no treinamento do modelo. É necessário que esses dados sejam de alta qualidade e estejam intimamente alinhados com a natureza do problema em questão. Durante a análise dos dados provenientes das aeronaves, emergem desafios técnicos notáveis, como redundâncias nos dados, falta de compreensão em relação ao significado de determinadas colunas e a baixa frequência de ocorrência de falhas. Esses obstáculos, por sua vez, dificultam a capacitação do modelo de previsão de falhas para fins de manutenção. No entanto, é importante ressaltar que a presença de dados provenientes de outras aeronaves, juntamente com o respaldo de estudos científicos bem-sucedidos em previsões temporais, fundamentam a viabilidade técnica do projeto. A exploração desses dados suplementares, aliada a abordagens já consolidadas, possui o potencial de superar os desafios identificados de maneira eficaz.

##### Integração de sistemas

- Utilização da solução: A eficaz harmonização entre sistemas distintos desempenha um papel fundamental para garantir a operação contínua e sem atritos da solução. Dentro deste contexto, é preciso considerar o uso otimizado das tecnologias disponíveis e sua perfeita adaptação às infraestruturas já em uso pelo parceiro de projeto. Para isso, a conteinerização da aplicação, juntamente à utilização das ferramentas da AWS, facilitam a integração com os sistemas já existentes na empresa.

##### Custo e investimento

- Orçamento: O processo de desenvolvimento e implementação pode envolver custos elevados. Nesse contexto, é fundamental avaliar cuidadosamente se o retorno do investimento justifica os recursos alocados para a empresa.

##### Conclusão

Ao considerar o escopo abrangente dos aspectos envolvidos, torna-se evidente que a intersecção harmoniosa de tecnologias, dados, integração de sistemas e análise de custos desempenha um papel crítico na determinação do sucesso da empreitada. O projeto é tecnicamente viável e torna-se eficaz se estabelecidos padrões robustos em sua construção.

#### <a name="c322"></a>3.2.2 Comparação de processos para captura dos dados através de Benchmarks

A seleção de tecnologias para a captura de dados é uma etapa fundamental para qualquer organização que deseja coletar, armazenar e processar dados de forma eficiente e eficaz. Para tomar decisões informadas sobre quais tecnologias escolher, é importante considerar diversos critérios e comparar com as princpais ofertadoras do serviço no mercado (os serviços considerados foram comparados em suas verões padrões/intermediárias).

|  Critérios       |  Amazon S3       |  Microsoft Azure blobs  |  Google Cloud Platform (GCP)  |
|------------------|------------------|-------------------------|-------------------------------|
|**Latência**      | 0,010s ~ 0,200s  | 0,050s                  | 0,020s                        |
|**Custo**         | $0,023/GB        | $0,018/GB               | $0,023/GB                     |
|**Resiliência**   | 99,99%           | 99,99%                  | 99,99%                        |

#### <a name="c323"></a>3.2.3 Matriz de Decisão para as Tecnologias Selecionadas

##### Critérios e Pesos

|  Critérios        |  Peso  |
| ----------------- |:------:|
|  Resiliência      |  1     |
|  Latência         |  2     |
|  Custo            |  3     |
|  Segurança        |  5     |
|  Familiaridade    |  7     |

##### Avaliação das Tecnologias

|  Tecnologias                  |  Resiliência  |  Latência  |  Custo  |  Segurança  |  Familiaridade  |  Pontuação Total  |
|-------------------------------|:-------------:|:----------:|:-------:|:-----------:|:---------------:|:-----------------:|
|  Amazon S3                    |  5            |  3         |  4      |  5          |  5              |  83               |
|  Microsoft Azure blobs        |  5            |  4         |  5      |  5          |  3              |  74               |
|  Google Cloud Platform (GCP)  |  5            |  5         |  4      |  5          |  4              |  80               |

A conclusão foi que os princípais serviços do mercado são bem parecidos entre sí, com mecanismos excelentes de segurança, com garantia de funcionamento e manutenção dos dados e baixa latência. No fim optamos por escolher o serviço Amazon S3 pela familiaridade dos integrantes em sua utilização.

### <a name="c33"></a>3.3 Elementos gerais do solução proposta

#### <a name="c331"></a>3.3.1 Diagrama de blocos
A proposta de estrutura para a implementação do projeto foi baseada em dois princípios:

- **Escalabilidade:** A estrutura foi planejada para que o cliente possa dimensionar e personalizar o sistema para suas necessidades. Seja para adicionar novos modelos de IA à plataforma ou para adicionar enésimos usuários ao sistema.

- **Portabilidade:** Embora o projeto inicial tenha sido pensado para a AWS, todos os recursos utilizados são amplamentes disponiveis na maioria das nuvens comerciais, tornando a migração extremamente fácil.

<ol>
  <li>
	Frontend: O usuário entra em contato com o sistema apartir do nosso website, feito com <a href="https://nextjs.org/">Next.js</a> e hospedado no <a href="https://vercel.com/">Vercel</a> .
  </li>
  <li>
    	Backend: Todo o processamento de dados é feita na máquina principal, que roda um servidor <a href="https://expressjs.com/">NodeJS + Express</a> e utiliza do serviço AWS EC2. Ele é o responsável por armazenar e processar todos os tipos de dados da aplicação, além de chamar o serviço de IA que está sendo solicitado. O servidor foi pensado para comportar inúmeros modelos diferentes de IA, embora tenha apenas um no atual momento
  </li>
  <li>
    	ETL e Inteligencia Arficial: O processo de ETL e a comunicação com o modelo pré treinado é feita a partir de uma API própria feita em Flask e essa, por sua vez, tem comunicação direta com o Backend principal e o banco de dados. Além disso esse bloco usurá o serviço AWS EC2.
  </li>

  <li>
    	Banco de dados: O banco de dados da aplicação utiliza o Postgress, nele será armezanado todas as informações relativas a aplicação. Seu armazenamento será feito em nuvem com o serviço da AWS RDS.
  </li>
</ol>


<br>
<p align="center"><img src="https://github.com/2023M7T2-Inteli/flAI/assets/99221221/fcc50a9c-5850-4234-a2cc-b6d64e624f5f" width="70%" height="auto"></img></p>
<p align="center"><b>Figura 6 — Diagrama de blocos da solução</b></p>
<br>


#### <a name="c332"></a>3.3.2 Fluxo de uso da solução

<br>
<p align="center"><img src="https://github.com/2023M7T2-Inteli/flAI/blob/docs/documentos/images/fluxograma.png?raw=true" width="50%" height="auto"></img></p>
<p align="center"><b>Figura 7 — Fluxograma da solução</b></p>
<br>

#### <a name="c333"></a>3.3.3 Armazenamento dos dados 

Para armazenar os dados será utilizado um banco de dados relacional, devido à sua facilidade de organizar as informações em estruturas de tabelas e evitar a repetição de elementos de uma tabela para outra. Para o banco de dados utilizaremos o Postgres junto com o RDS (Relational Database Service) para o instanciamento do banco de dados na nuvem, sendo esse um serviço da Amazon AWS. Adicionalmente, também será utilizado o Amazon S3 (Simp

## <a name="c4"></a>4. Desenvolvimento da solução

### <a name="c41"></a>4.1. Modelagem da inteligência artificial

#### <a name="c411"></a>4.1.1 Formato dos dados

Os arquivos que contêm os dados foram recebidos são de extensão .parquet, um formato que permite armazenar dados em colunas, de forma comprimida, e que pode ser lido por diversos sistemas de processamento de dados — inclusive a biblioteca Pandas, da linguagem Python, que foi utilizada inicialmente para explorar esses dados. No âmbito deste projeto, esses arquivos serão utilizados como a fonte primária de dados.

A princípio, foram recebidos dezesseis arquivos de extensão .zip, cada qual armazenando diversos arquivos .parquet. Cada arquivo .zip representa uma aeronave distinta da companhia aérea. Os arquivos comprimidos, entretanto, representam dados de voos realizados por cada aeronave. O conjunto de dados é composto por cerca de 2000 voos, sendo que cada arquivo possui 93 colunas e uma quantidade variável de registros, a depender do tempo de duração do voo. Os dados, em sua totalidade, estão em formato float64, o que poderá ser alterado futuramente para economia de espaço.

#### <a name="c412"></a>4.1.2 Análise exploratória

Ao realizar a análise de dados utilizando Pandas, foi possível perceber uma grande quantidade de linhas com valores nulos. Posteriormente, foi descoberto que isso ocorre devido às diferenças no tempo de captação de cada um dos sensores acoplados ao sistema de Bleed Air das aeronaves, o que faz com que alguns sensores não tenham sejam capazes de captar valores para todos os momentos de tempo. Nesse caso, foram identificados sensores que captam as informações de 50 em 50 milissegundos, enquanto outros captam as informações de 100 em 100 milissegundos, outros de 200 em 200 milissegundos, e também de 1 em 1 segundo.

Além disso, foi possível perceber que o conjunto de dados é composto por diversas colunas que não apresentam correlação com o sistema de Bleed da aeronave, e que, portanto, não serão utilizadas para a construção do modelo preditivo.

#### <a name="c413"></a>4.1.3 Pré-processamento

Para essa etapa, foram analisadas as principais colunas que apresentavam correlação com o sistema de Bleed da aeronave. As demais colunas foram descartadas, pois não apresentavam grande correlação com as variáveis alvo do modelo preditivo.

A primeira camada de dados a ser processada inclui informações detalhadas sobre as aeronaves em questão. Isso abrange suas características técnicas, fases de voo e suas respectivas durações. Esses dados foram tratados como inicialmente fundamentais para a identificação de padrões e tendências que podem estar correlacionados com falhas dos equipamentos de Bleed.

##### Tratamento de dados para primeira versão do modelo

Inicialmente, foi identificado que os dados provenientes de uma única aeronave não continham uma quantidade suficiente de ocorrências de falhas para possibilitar o treinamento de um modelo confiável.

Para abordar essa limitação, foi necessário agregar os registros de falhas de 16 aeronaves distintas em uma única estrutura de dados. Isso resultou na formação de um conjunto de dados mais abrangente e substancial em termos de ocorrências de falhas.

Dado o volume substancial desses dados e a complexidade inerente à sua interpretação, na primeira iteração do modelo, optou-se por realizar uma simplificação substancial no conjunto de dados. Isso envolveu a exclusão de todas as colunas, com exceção das colunas relacionadas às mensagens de falha e às fases de voo.

A fim de reduzir ainda mais a dimensionalidade dos dados, cada voo foi condensado em apenas três linhas, correspondentes a cada fase de voo. Durante esse procedimento, o valor mais elevado das colunas relacionadas às variáveis alvo foi retido, assegurando, assim, a representação da ocorrência de falha no novo conjunto de dados. Adicionalmente, foi introduzida uma coluna para capturar a duração de cada fase de voo, calculada como a diferença entre os horários de início e término do registro.

Outras modificações englobaram a inclusão de colunas identificadoras para o código do voo e da aeronave. Todos esses dados foram consolidados por meio da concatenação das tabelas simplificadas de cada voo.

Com o objetivo de aprimorar a utilização dos dados, foi realizada uma simplificação dos números de série das aeronaves, convertendo-os em números de 1 a 16. Da mesma maneira, os números dos voos foram reformulados para estabelecer uma sequência cronológica contínua, variando de 1 até o último voo de cada aeronave. Uma coluna booleana adicional, denominada "pré-falha", foi inserida, com valor 1 para os 15 voos que antecedem uma falha e 0 para os demais.

Para enriquecer ainda mais o conjunto de dados e fornecer informações cruciais para a análise de falhas, uma coluna adicional foi adicionada, denominada "tempo desde a última manutenção". Para realizar essa incorporação, o conjunto de dados foi inicialmente reordenado por aeronave e data. Em seguida, foi criada uma tabela que continha as datas das manutenções, formatada de maneira a incluir apenas as colunas de data e aeronave, mantendo as demais em branco. Uma nova coluna, chamada "manutenção", foi criada tanto no conjunto de dados principal quanto na tabela de datas de manutenção, com valor 1 na tabela de manutenção e 0 no conjunto de dados principal. Em seguida, as duas tabelas foram mescladas e reordenadas por aeronave e data novamente. Para calcular o tempo decorrido desde a última manutenção, uma nova coluna chamada "tempo desde a última manutenção" foi criada, somando-se a duração de cada fase de voo, zerando-a sempre que a coluna de "manutenção" era igual a 1. Após esse processo, as linhas em que a coluna "manutenção" era igual a 1 foram removidas, e a coluna de duração foi excluída do conjunto de dados, pois se tornou redundante para a análise subsequente. Esse novo dado proporciona insights valiosos sobre o histórico de manutenção de cada aeronave e pode ser crucial para entender o contexto das ocorrências de falhas.

Por fim, a partir da criação de um dataset tratado e normalizado, foi realizada uma divisão em dois diferentes dataframes. Um deles seria destinado ao uso somente com as variáveis de recursos — em que foi aplicado o método PCA para diminuir a dimensionalidade dos dados —, enquanto o outro utilizaria a variável dependente (target). Em seguida, os dados do primeiro dataframe foram separados em conjuntos de treino e teste para o treinamento do modelo, utilizando 30 para teste e selecionando amostras de forma aleatória. Posteriormente, foi aplicado o método de validação cruzada e uma matriz de confusão foi construída, possibilitando uma análise do comportamento do modelo. Dessa forma, foi possível visualizar o desbalanceamento dos dados, e foi mapeada a necessidade de mudar algumas abordagens relacionadas à utilização do conjunto de variáveis dependentes.

<b>Resultados de acurácia da validação cruzada:</b>

<br>
<p align="center"><img src="https://github.com/2023M7T2-Inteli/flAI/blob/docs/documentos/images/Captura%20de%20tela%202023-08-28%20022247.png?raw=true" width="70%" height="auto"></img></p>
<p align="center"><b>Figura x — Output recebido para a validação cruzada</b></p>
<br>

<b>Matriz de confusão e acurácia do modelo:</b>

<br>
<p align="center"><img src="https://github.com/2023M7T2-Inteli/flAI/blob/docs/documentos/images/Captura%20de%20tela%202023-08-25%20134521.png?raw=true" width="60%" height="auto"></img></p>
<p align="center"><b>Figura x — Matriz de confusão obtida para o modelo testado</b></p>
<br>

<br>
<p align="center"><img src="https://github.com/2023M7T2-Inteli/flAI/blob/docs/documentos/images/Captura%20de%20tela%202023-08-28%20022301.png?raw=true" width="70%" height="auto"></img></p>
<p align="center"><b>Figura x — Output recebido para a acurácia do modelo</b></p>
<br>

#### <a name="c414"></a>4.1.4 Insights obtidos a partir dos dados

A partir da análise exploratória, foi possível encontrar inconsistências em uma das colunas de dados, denominada "phaseOfFlight-1", que aponta a fase do voo em que a aeronave se encontra. De acordo com as informações fornecidas, essa coluna apresenta os valores numéricos 0, 1 e 2, que simbolizam, respectivamente, as fases de subida, cruzeiro e descida.

Dessa forma, de forma lógica, um voo tradicional deveria seguir o padrão de valores 0, 1 e 2, em ordem crescente, indicando que a aeronave está subindo, em cruzeiro e descendo. Contudo, foi possível perceber que, em grande maioria dos casos, a coluna apresenta valores 0, 1, 2 e 0, o que indica que a aeronave está subindo, em cruzeiro, descendo e, novamente, subindo. Essa situação pode ser representada pelo gráfico abaixo:

<img src=".\images\Phase_of_Flight_Common.png">

De forma semelhante, também foi possível perceber que, em alguns casos, a coluna apresenta somente o valor 0, o que indica que a aeronave está subindo, mas não está em cruzeiro ou descendo. Essa situação pode ser representada pelo gráfico abaixo:

<img src=".\images\Phase_of_Flight_Only_Climb.png">

Além disso, também foi possível perceber que, nos voos em que somente é encontrado o valor 0, a ocorrência de falhas no sistema de Bleed da aeronave é muito maior do que nos demais casos. Essa observação foi detalhada de forma mais clara no notebook "erros.ipynb", que pode ser encontrado na pasta "notebooks" deste repositório.

#### <a name="c415"></a>4.1.5 Carregamento de dados

Conforme foi explicado anteriormente, o volume dos dados é muito grande, ocupando diversos gigabytes de armazenamento quando consideramos os dados de todas as aeronaves, mesmo que estejam em formato parquet, que é bastante compactado. Sendo assim, ferramentas de análise de dados comuns e também os dispositivos computacionais que possuímos não são suficientes para lidar com essa quantia massiva. Dessa forma, surge a necessidade de que haja uma grande seleção acerca de quais serão as colunas que serão utilizadas para a criação do modelo.

#### <a name="c416"></a>4.1.6 Estratégias para redução da dimensionalidade

Dessa forma, com o intuito de reduzir o espaço de armazenamento necessário para os dados, serão empregados filtros que reduzam a quantidade de espaço alocado para cada item. Nesse sentido, é importante destacar que todas as colunas do dataframe estão do formato float64, o qual é capaz de conter valores muito altos, porém, gastam mais espaço. Portanto, as diversas colunas que apresentam valores binários poderão ser transformadas no formato de bit, o que irá trazer uma redução de dimensão de 64 vezes em relação ao tamanho original da coluna, o que é bastante significativo.

Além disso, as colunas que apresentarem valores numéricos mais diversificados poderão ser transformados no formato float16, o que foi indicado pelo parceiro como sendo suficiente para lidar com os dados captados pela aeronave. Dessa forma, será possível diminuir em 4 vezes a ocupação de espaço por essas colunas.

Como uma alternativa adicional para a redução da dimensionalidade, também está sendo estudada a análise dos dados dos sensores a cadas intervalo de tempo aumentado, como por exemplo, lidar com os dados a cada segundo, ao invés de tratá-los a cada 50 milésimos. A partir disso, seria possível reduzir o tamanho de todos os arquivos em 20 vezes, o que também contribuiria bastante para lidarmos com o problema com recursos limitados. Entretanto, é necessário analisar que a redução de dimensionalidade nesse sentido traria também a necessidade de analisar as possíveis falhas que poderiam surgir entre os intervalos de captação.

Após esses processos, os dados se tornarão muito menores, o que possibilitará o seu upload para o bucket em nuvem posteriormente, sem que haja um gasto tão elevado com armazenamento de dados que inviabilize a execução do projeto. Após esse passo, poderemos prosseguir o processo de ETL, enviando os dados foi para que sejam acessados pela API que carrega nosso modelo preditivo.

#### <a name="c417"></a>4.1.7 Features e colunas de destaque

Até o presente momento, foi percebido que algumas colunas apresentam elevada correlação com o problema proposto. A partir das duas colunas de target (message418-DAA e message422-DAA), que apontam o estado de falha do sistema de Bleed, foi percebido que alguns outros dados de sensores apresentam uma certa correlação com o target.

Como exemplo, podemos perceber que a mudança de fases de voos aumenta a probabilidade de acarretar falhas no sistema de Bleed, assim como também as alterações nos sensores de pressão. Portanto, dados como esse serão priorizados durante a escolha do modelo.

Adicionalmente, o parceiro de projeto forneceu posteriormente os dados de altitude do avião, que podem apresentar grande correlação com o sistema de Bleed, o que irá trazer insights importantes e poderá confirmar ou negar hipóteses que desenvolvemos.

#### <a name="c418"></a>4.1.8 Utilização do autoIML para testes em diferentes modelos


##### Modelo 1
Foi utilizado a estratégia da aplicação da biblioteca Pycaret, que consiste em uma biblioteca de aplicação de AutoML que treina o mesmo conjunto de dados para varios modelos de ML difentes. Dessa forma utilizando o dataset já com os dados tratados, chegamos em um resultado de que o melhor modelo foi o decision tree, como uma acurácia 0.9977. Tivemos alguns insights interessantes utilizando a ferramenta de feature importance do pycaret então decidimos fazer algumas alterações no tratamento de dados incluindo outras colunas com diferentes tratamentos.

##### Imagem das métricas do modelo 
<p alingn = "center">
<img src="images\modelo1.png" width="650px">
</p>

##### Feature importance 
<p alingn = "center">
<img src="images\FeatureImportanceModelo1.png" width="650px">
</p>

##### Modelo 3

Fizemos um teste com o outro modelo adicionando uma nova coluna que se mostrou relevante, contudo fizemos outro teste com outro modelo que obteve resultados semelhantes, porém com mais informações agregadas. Por esse motivo, não será descrito, mas ele se encontra no repósitório. Assim, com o teste de um novo conjunto de dados, chegamos a outras avaliações de modelos. Dessa vez, o modelo com o melhor resultado foi o XGBoost, com uma acurácia de 0.9989.

##### Imagem das métricas do modelo

<p alingn = "center">
<img src="images\modelo3.png" width="650px">
</p>

##### Feature importance

<p alingn = "center">
<img src="images\FeatureImpotanceModelo3.png" width="650px">
</p>

Analisando as features importance, percebemos que a coluna Aircraft ainda possui muita relevância, mas a nova coluna adicionada time_since_maintenace, possui uma grande relevancia, essa foi uma informação importante para os próximos passos executados na análise. Além disso, as outras colunas adicionadas e o phaseOfFlight continuam com pouca relevância no geral.

Para investigarmos com mais detalhes como este modelo estava se comportando utilizamos o mesmo conjunto de dados mas agora fazendo o treinamento do modelo utilizando as ferramentas do scikitlearn. Após realizarmos esse treinamento chegamos em resultados muito parecidos com o do pycaret em relação as métricas do modelo. Contudo agora possuimos o modelo isolado e acesso aos conjuntos de teste e treino.

Sendo assim, aplicamos o método de validação cruzada para verificar se o modelo estava overfitado, treinando o modelo varias vezes com um conjunto de dados disponiveis e outros dados gerados combinando assim a possibilidade de classificação do modelo. Como resultado, obtivemos uma alta variancia na acurácia do modelo o que implica que ele estava com indícios de overfit.

<p alingn = "center">
<img src="images\ValidaçãoCruzada.png" width="650px">
</p>

Como palpite para melhorar o desempenho do modelo, pensamos em retirar a coluna Aircraft, pois ela possuia a maior relevância para a criação do modelo e poderia estar indicando um padrão de repetição para o modelo, fazendo com que ele chutasse as predições com base nessa variável e não utilizasse as outras da maneira correta.

Após fazer isso obtivemos resultados interessantes, a acurácia do modelo e as métricas diminuíram, mas a validação cruzada reduziu significativamente a sua variância.

##### Métricas sem a coluna Aircraft
<p alingn = "center">
<img src="images\ModeloSemAircraft.png" width="650px">
</p>

##### Feature importance
<p alingn = "center">
<img src="images\FeatureImportanceModeloSemAircraft.png" width="650px">
</p>

##### Validação Cruzada 

<p alingn = "center">
<img src="images\ValidaçãoCruzada2 .png" width="650px">
</p>

##### Modelo 4

Para o modelo 4 adicionamos colunas em relação a dados de altitude, temperatura e pressão que foram captados no sensores. Dessa forma como teste inicial apenas rodamos o AutoIML do pycaret na nossa base de dados realizando apenas a normalização das variáveis e obtivemos os seguintes resultados.

##### Métricas dos melhores modelos

 <p alingn = "center">
<img src="images\MetricasModelosDSODesbalanceado.png" width="650px">
</p>

##### Matriz de confusão do melhor modelo

 <p alingn = "center">
<img src="images\MatrixdeConfusaoDSODesbalanceado.png" width="650px">
</p>

Através da matriz de confusão, percebemos claramente que o modelo está desbalanceado tendo em vista a diferença de quantidade de variáveis 1 para variáveis 0. Outra informação que confirma está hipótese é o F1 score que realiza um média harmônica das duas principais métricas precision e recall, como o recall está considerávelmente abaixo da precisão que por consequência o F1 score também está muito baixo, fica claro que os dados estão desbalanceados. 

Para resolver este problema existe duas soluções principais, aplicar Oversample que seria aumentar a quantidade de incidencia de dados da classe minoritária até que ela se iguale a quantidade de itens da classe majoritária. Ou aplicar o Undersample que seria diminuir a quantidade de dados da classe majoritária até o tamanho da classe minoritária. Assim análisando os dados percebemos que o Oversample é a melhor opção devido ao tamanho da classe minoritária se apenas quase 2000 linhas. Enquanto a classe majoritária possui quase 40 mil dados, sendo assim para não perdemos essa quantidade de informação aplicamos o Ovesample no modelo.

Dessa forma aplicando o Oversemple de maneira simples no modelo tivemos os seguintes resultados.

##### Métricas dos melhores modelos balanceados

 <p alingn = "center">
<img src="images\MetricasModelosETCBalanceadoPycaret.png" width="650px">
</p>

##### Matriz de confusão do modelo balanceado

 <p alingn = "center">
<img src="images\MatrizConfusaoETCBalanceadoPycaret.png" width="650px">
</p>

Assim analisando estes resultados, levantamos a hipótese que o modelo estava com sobreajueste ou overfitting. Para comprovarmos que a hipótese poderiamos aplicar o método de validação cruzada e analisar o melhor modelo de maneiras mais especificas. Contudo, antes de testar este método foi feito uma análise exploratória das features selecionadas e se havia redundância de informações que poderiam estar comprometendo o modelo. 

##### Mapa de calor sobre correlação de colunas

 <p alingn = "center">
<img src="images\MapaDeCalorDSO.png" width="650px">
</p>

Assim analisando o mapa é possivel percerber que a maioria das colunas que possuem a mesma referência mas para turbinas diferentes como por exemplo a coluna DeltaPressAltitude 1-a e DeltaPressAltitude 2-a, possuiam muita correlação entre si. Logo, pode se inferir que ambas as colunas estavam expressam a mesma informação e gerando redundância de dados no modelo. Dessa forma, retiramos algumas colunas que possuiam alta correlação (acima de 0.5) e utilizamos apenas essas colunas como features.

##### Mapa de calor sobre correlação de colunas com seleção de features

 <p alingn = "center">
<img src="images\MapadeCalorDSOSemRedundancia.png" width="650px">
</p>

Feito essa nova seleção de features, o modelo que apontou o melhor resultado ExtraTreeClassifier, foi reproduzido em um notebook a parte para a aplicação da validação cruzada e algumas possiveis modificações na divisão de conjunto de treino e teste. Assim tivemos os seguintes resultados 

##### Matriz de confusão do modelo balanceado

 <p alingn = "center">
<img src="images\MatrizConfusaoETCBalanceado.png" width="650px">
</p>

##### Métricas do modelo balanceado

 <p alingn = "center">
<img src="images\MetricasETCBalanceado.png" width="650px">
</p>

##### Validação cruzada
 <p alingn = "center">
<img src="images\ValidacaoCruzadaETCBalanceado.png" width="650px">
</p>

Apesar da validação cruzada apresentar ótimos resultados(variação entre maior valor e menor valor de 0.47%) mostrando que possivelmente os dados não estariam com sobre ajustes, as métricas apresentadas aparentam estar muito infladas em relação ao padrão de modelos preditivos. Portanto decidimos fazer mais alguns testes mudando o método de oversample, tendo em vista que o método aplicado foi o mais simples o que poderia estar comprometendo a integridade dos dados populando o dataset com dados sintéticos muito próximos e com a mesma informação. 

Assim aplicamos outros três métodos para ovesample que possuiam maior complexidade na criação de dados sintéticos e na selação de informações que seriam interpoladas entre eles. O Primeiro método foi o Smote, que é um pouco mais elaborado que o Oversample ele leva em consideração todos os pontos igualmente da classe minoritária para a criação de novos dados e não apenas replica elas como o Oversample faz. Obtivemos os seguintes resultados. 

##### Matriz de confusão do modelo com SMOTE

 <p alingn = "center">
<img src="images\MatrizConfusaoETCBalanceadoSmote.png" width="650px">
</p>

##### Métricas do modelo com SMOTE

 <p alingn = "center">
<img src="images\MetricasETCBalanceadoSmote.png" width="650px">
</p>

Para a validação cruzada como teste aplicamos uma vez com 5 k-folds e depois com 10 k-folds.

##### Validação cruzada 5 k-folds
 <p alingn = "center">
<img src="images\ValidacaoCruzada5VezesETCBalanceadoSmote.png" width="650px">
</p>

##### Validação cruzada 10 k-folds
 <p alingn = "center">
<img src="images\ValidacaoCruzada10VezesETCBalanceadoSmote.png" width="650px">
</p>

Assim, fica evidente que as métricas apresentaram uma maior variação em relação ao oversample simples e que a validação cruzada continuou com bons resultados tendo uma variação de 1.66% com 5 k-folds e de 3.05%. 

Portanto, aplicamos também um outro método de oversample chamado Adasyn que funciona através da utilização do algoritimo k-nn para a criação de dados sintéticos para o oversample. Entretanto, ele não apresentou resultados interessantes tendo em vista que o método de k-nn não é muito eficaz para a seleção aleatória de dados podendo ser facilmente enviésado. Obtivemos esses resultados 

##### Matriz de confusão do modelo balanceado com Adasyn

 <p alingn = "center">
<img src="images\MatrizConfusaoETCBalanceadoAdasyn.png" width="650px">
</p>

##### Métricas do modelo balanceado com Adasyn

 <p alingn = "center">
<img src="images\MetricasETCBalanceadoAdasyn.png" width="650px">
</p>

##### Validação cruzada Adasyn
 <p alingn = "center">
<img src="images\ValidacaoCruzadaETCBalanceadoAdasyn.png" width="650px">
</p>

Analisando a validação cruzada com a utilização do adasyn fica claro como ele não conseguiu criar dados sintéticos eficientes para o modelo e contribuindo para o overfitting, tendo em vista a sua variação de 16.09%

Por fim, foi aplicado um outro método de oversample sendo uma variação do SMOTE o BorderLineSMOTE, no qual a sua principal diferença entre o SMOTE é que ao invés de considerar todos os pontos igualmente, ele utiliza apenas os pontos de extremidades entre a classe majoritária e minoritária, seguindo o princípio de que esses seriam os pontos mais dificeis de classificar ele utiliza as informações destes ponto para realizar um interpolação para a criação de  novos dados sintéticos.

Através deste método obtivemos os melhores resultados e decidimos adotálo como método oficial.

##### Matriz de confusão do modelo balanceado com BorderLineSmote

 <p alingn = "center">
<img src="images\MatrizConfusaoETCBalanceadoBorderLineSmote.png" width="650px">
</p>

##### Métricas do modelo balanceado com BorderLineSmote

 <p alingn = "center">
<img src="images\MetricasETCBalanceadoBorderLineSmote.png" width="650px">
</p>

##### Validação cruzada BorderLineSmote
 <p alingn = "center">
<img src="images\ValidacaoCruzadaETCBalanceadoBorderLine.png" width="650px">
</p>

Ele obteve as melhores métricas e a uma das melhores variações na validação cruzada de 2.71%
#### Investigação dos resultados do modelo 
Para investigarmos o resultado do modelo primeiro levantamos algumas hipóteses e depois validamos elas através de testes feito com o modelo. A primeira hipótese foi de que o modelo poderia estar enviesada de alguma forma mesmo não apresentando mais sinais de sobreajuste. 
##### Separação de conjuntos iniciais para treinar e testar o modelo 

<img src="images\image.png" width="650px">

##### Separação de conjunto a parte para ser validado pelo modelo
<img src="images\image-1.png" width="650px">

Após essa separações obtivemos diferentes resultados para os diferentes conjuntos.
##### Resultados conjuntos de validação 
<img src="images\image-4.png" width="650px">

<img src="images\image-5.png" width="650px">

##### Resultados conjuntos de testes 
<img src="images\image-2.png" width="650px">

<img src="images\image-3.png" width="650px">

Assim mesmo com um diferença entre os resultados que ja era esperado, essa variação foi significativamente pequena mantendo assim a boa performance do modelo. Portanto como ultimo teste de validação o modelo foi treinada e validado utilizadno um dataset que foi tratado com oversample, explicado anteriormente, e foi testado com um data set desbalanceado com os dados originais. Dessa forma obtivemos os seguintes resultados. 
<img src="images\image-6.png" width="650px">
<img src="images\image-7.png" width="650px">
Portanto, mesmo utilizando dados de entrada para teste desbalanceados o modelo ainda se comportou de maneira efetiva e apesar da queda nas métricas apresentou um bom resultado. 

#### Aplicação de hiperparâmetros
Para utilizar os hiperparâmetros no modelo utilizamos a ferramente de random search, que utiliza uma busca selecionando os hiperparâmetros com melhores resultados e descartando os demais de maneira aleatória, realizando um "torneio" entre a combinação dos parâmetros. Para a aplicação dessa ferramenta foi utilizado os seguintes parâmetros.
<img src="images\image-8.png" width="650px">

##### Aplicação da ferramenta 
<img src="images\image-9.png" width="650px">
Após essa aplicação utilizamos a três principais métricas para serem otimizadas resultando nos seguintes parâmetros.

##### Precisão 
 - n_estimators=400, random_state=42, min_samples_split =2, min_samples_leaf = 1, max_features = 'sqrt', max_depth = 50, bootstrap = False 
##### Recall
- n_estimators=400, random_state=42, min_samples_split =2, min_samples_leaf = 1, max_features = 'sqrt', max_depth = 50, bootstrap = False 
##### Acurácia
 - n_estimators=500, random_state=42, min_samples_split = 5, min_samples_leaf = 1, max_features = 'log2', max_depth = 50,bootstrap = False


### Considerações sobre o custo de execução do modelo

Finalizada a construção do modelo preditivo, iniciaram-se estudos a respeito dos custos relacionados à execução da inteligência artificial criada. A fim de estimar o custo de execução do modelo, foram considerados os seguintes fatores:

**1. Tempo de execução do modelo**

Os custos de execução aumentam proporcionalmente ao tempo — por essa razão, é fundamental estimar o tempo necessário para rodar o modelo. Após a realização de algumas iterações de teste, foi possível concluir que o modelo leva, aproximadamente, treze minutos para ser completamente executado.

**2. Instância em que o modelo será executado**

Os componentes da aplicação desenvolvida serão hospedados nos serviços de nuvem da AWS. Sabe-se que o back-end da aplicação, responsável pela execução do modelo preditivo, será instanciado em uma máquina EC2. Dessa forma, o custo de utilização da instância também deve ser considerado.

**3. Dimensão do dataset utilizado**

A dimensão da base de dados influencia diretamente os possíveis gastos com o modelo. No contexto do projeto, o dataset final utilizado para treinar o modelo consome, aproximadamente, 12 megabytes de armazenamento.

**4. Frequência de execução do modelo**

É necessário considerar, sobre esse aspecto, que o modelo preditivo se aplica à avaliação do sistema de Bleed Air de qualquer aeronave E2. Existem dezesseis aeronaves para as quais o parceiro poderá executar o modelo, bem diferentes periodicidades, a depender dos critérios da companhia aérea.

Uma vez analisados os aspectos descritos, é possível realizar uma estimativa dos custos de execução do modelo. Para isso, é possível utilizar a calculadora disponibilizada pelo provedor de cloud escolhido — no caso do projeto, recomenda-se utilizar a da AWS.

**Simulação do custo de execução do modelo**

A fim de estimar um custo de execução para o modelo, foram definidas circunstâncias hipotéticas a fim de nortear os aspectos da análise financeira do projeto que envolvem a implementação do modelo preditivo.

Supondo que o modelo seja executado semanalmente, aproximadamente 11,3 horas seriam dedicadas à execução do modelo no período de um ano. Se houver uma taxa horária de $0,42, o custo computacional anual seria de, aproximadamente, $4,74. Se dezesseis predições forem realizadas toda semana, inferindo que todas as aeronaves do modelo E2 tenham seus dados submetidos ao modelo, podemos estimar 832 previsões no período de um ano. Se houver uma taxa de $0,10 para cada 1000 predições realizadas no contexto do serviço em que o modelo será hospedado, então o custo anual seria de, aproximadamente, $0,0832.

É importante destacar, no entanto, que a simulação realizada leva em consideração apenas o custo computacional envolvido no modelo preditivo. Para a obtenção de estimativas com maior grau de assertividade, será necessário que o parceiro de projeto adapte os cálculos para as condições sob as quais a solução será implementada e considere, também, o custo da infraestrutura que fornecerá suporte ao modelo.

### <a name="c42"></a> 4.2. Interface gráfica

- **Página de login**:  A página de login será o ponto de acesso inicial da aplicação. Para seu acesso é necessário inserir email e senha.

![login](https://github.com/2023M7T2-Inteli/flAI/assets/99221221/4651586a-b4b1-4fc6-aa4c-cb83784f9cb7)


- **Página de consulta de modelos disponiveis**: A fim de agregar valor a aplicação foi criada a página de acesso a modelos disponiveis no acervo do parceiro. Apesar do projeto em questão ter apenas um modelo, a ideia da construção dessa página é vislumbrar a continuidade do projeto inserindo demais modelo de inteligência artificial usados pelo parceiro.
  
![modelos](https://github.com/2023M7T2-Inteli/flAI/assets/99221221/33c1f3b5-e5b3-4351-a875-dde1f15a4369)

- **Página Dashboard**: A página dashboard é o ponte de entrada para utilizar o modelo. Nela, será possível selecionar aeronave e inserir arquivo ".parquet" para realizar nova predição. Os resultados são apresentados e podem ser consultos em gráfico.

![dashboard](https://github.com/2023M7T2-Inteli/flAI/assets/99221221/d32b43e7-01e6-42fb-9a51-9950d16f6155)


- **Página Aeronaves**: Essa página tem como função a administração de aeronaves registradas na plataforma. Nela será possível consultar e registrar aeronaves.

![aeronaves](https://github.com/2023M7T2-Inteli/flAI/assets/99221221/f2bd5eee-5042-4e08-9f12-da4665a87a5b)

- **Página de cadatros de usuários**: A página de cadastro de usuários somente é acessível através de usuários adminsitradores. Nela é possível criar novas contas e consultar usuários cadastrados.
  
![usuários](https://github.com/2023M7T2-Inteli/flAI/assets/99221221/737b7fe2-db68-487f-9310-0ed92d320a48)


### <a name="c43"></a>4.3 Backend da aplicação

O backend da aplicação atua como uma conexão entre as diferentes partes do sistema, incluindo o banco de dados, a interface web e o modelo de inteligência artificial. Para sua implementação, optamos pela tecnologia Node.js em conjunto com o framework Express.

As rotas de usuário são aquelas responsáveis pela parte de login, criação de usuário e autenticação.

`/user/login` : Rota responsável pelo processo de login dos usuários já cadastrados.

`/user/register` : Rota responsável por cadastrar novos usuários no banco de dados.

`/user/configureUser` : Rota responsável por configurar usuário de permissião nível 0 para virar nível 1.

`/user/logout` : Rota responsável pelo logout.

`/user/update` : Rota que atualiza o statusAdmin de um usuário

`/user/generatePassword` : Rota que gera uma senha aleatória para um usuário.

`/user/sendEmail` : Rota que envia um email para um usuário recém cadastrado com a senha gerada.

`/user/getAllUsers` : Rota que retorna todos os usuários cadastardos.

- Run Routes

As rotas de "runs" são responsáveis por pesquisar ou cadastrar no banco de dados informações relativas ao uso do modelo de inteligência arficial.

`/run/all` : Rota responsável por buscar todas as vezes que um modelo foi executados.

`/run//new/:modelId/:aircraftId` : Rota responsável por executar o modelo de inteligência artificial, através dela é enviado o arquivo parquet, que faz um redirecionamento do arquivo para a API que realiza o processo de ETL e predição.

- Model Routes

No projeto desenvolvido abranje-se a possibilidade de abrigar na plataforma demais modelos de inteligência artificial usados internamente pelo parceiro, sendo assim, as rotas de modelo são responsáveis por buscar os modelos cadastrados no banco de dados (No contexto atual terá apenas o modelo que abranje este MVP).

`/model/all`: Essa rota busca todos os modelos cadstrados.

`/modelo/new`: Essa rota tem função de cadastrar um novo modelo.

- Aircrafts Routes

As rotas de aircrafts são responsáveis pela administração das aeronaves cadastradas no sistema.

`/aircraft/getAllAircrafts`: Rota que retorna aeronaves cadastardas.

`/aircraft/newAircraft` :  Rota de cadastro de nova aeronave

`/aircraft/changeActivityAircraft` :  Rota responsável por mudar a atividade da aeronave

- Prediction Routes

A rota de prediction é reponsavel por acessar resultados gerados pela Inteligência Artificial.

`/prediction/result` : Retorna resultados de predições realizadas


#### <a name="c432"></a>4.3.2 Bancos de dados

O banco de dados atualmente é composto por cinco tabelas, sendo elas "Predicion", "Runs", "Model", "User" e "Aircrafts". Abaixo é visto a imagem que demonstra o relacionamento e as colunas existentes em cada uma delas.


![image](https://github.com/2023M7T2-Inteli/flAI/assets/99221221/8dd02666-8147-4173-b16f-b643c380a7a2)

### <a name="c44"></a> 4.4. Execução do projeto em ambiente de desenvolvimento

# Executando o projeto

Para executar o projeto, você pode escolher entre:

- **Container (Recomendado):** Executar a aplicação com Docker/Podman.
- **Código fonte:** Baixar e executar diretamente o *source code* do projeto em seu computador.

## Rodando o projeto com Containeres

Requisitos:
- Docker/Podman instalado.
- Portas 3000, 4000, 5432 e 8000 livres.

Passos:
- Da pasta `/src` do repositório, baixe o arquivo `docker-compose.yml`.
- No terminal, na mesma pasta em que o arquivo foi baixado, rode `docker compose up`
- Acesse `http://localhost:3000` no seu navegador!

## Rodando o projeto apartir do código fonte

> ATENÇÃO: O banco de dados Postgres não está incluído no projeto. Recomendamos que utilize um container Docker. Não esqueça de atualizar as informações de conexão nos servidores. Os passos abaixo levam em conta que o banco de dados está disponível.

**Requisitos**:
- Python >= 3.4, < 3.11 e pip3.
- NodeJs >= 9 e npm.
- Portas 3000, 4000, 5432 e 8000 livres.

**Passos**:
- Etapa 1: executando o servidor IA
    - Dentro do diretório`src/etl`, instale as dependencias necessárias com `pip install -r requirements.txt`
    - Execute `python3 app.py`
- Etapa 2: executando o servidor principal
    - Dentro do diretório`src/backend`, instale as dependencias necessárias com `npm install`
    - Execute `npm run start`
- Etapa 3: executando o website
    - Dentro do diretório`src/frontend`, instale as dependencias necessárias com `npm install`
    - Execute `npm run start`
- Acesse `http://localhost:3000` no seu navegador!


# Deploy

O deploy para produção do nosso serviço é bem simples e agnóstico de qualquer plataformas cloud.

**São necessários:**
- Uma máquina para os servidores, como AWS EC2.
- Um banco de dados Postgres.

Caso todos os serviços sejam servidos por uma única máquina, recomendamos **'pelo menos 8gb de memória RAM**. Para computadores com < 4gb de memória, é necessário ao menos 2gb de swap.

> Embora não tenha sido feito durante o desenvolvimento, um setup de Kubernetes é recomendado.


## <a name="c5"></a>5 Referências

- Embraer E-Jets E2. Disponível em: <https://pt.wikipedia.org/wiki/Embraer_E-Jets_E2>.
- Aircraft Bleed Air Systems. Disponível em: <https://skybrary.aero/articles/aircraft-bleed-air-systems>.
- Querosene de Aviação | Petrobras. Disponível em: <https://petrobras.com.br/pt/nossas-atividades/produtos/aviacao/querosene-de-aviacao/>.
- COMO FUNCIONA O SISTEMA BLEED AIR como afeta o sistema de ar condicionado. Disponível em: <https://www.youtube.com/watch?v=c_MK8yLx0E8>.
- Quais os impactos ambientais das viagens de avião? - eCycle. Disponível em: <https://www.ecycle.com.br/impactos-ambientais-viagem-de-aviao/>.
- ROBERTO, Í. What fuels do planes use? Disponível em: <https://www.aeroflap.com.br/en/combustiveis-dos-avioes/>.
- CEAB, Partes do Avião. Disponível em :<https://ceabbrasil.com.br/blog/partes-do-aviao/#:~:text=%C3%89%20o%20esqueleto%20da%20aeronave,materiais%20principais%3A%20a%C3%A7o%20e%20madeira.>
- Iberdrola, Quais são as consequências da superexploração dos recursos naturais? Disponível em: <https://www.iberdrola.com/sustentabilidade/superexploracao-dos-recursos-naturais>
- AWS, Amazon S3. Disponível em:<https://aws.amazon.com/pt/s3/?nc=sn&loc=0>
- Azuere, Azure Blob Storage. Disponível em:<https://azure.microsoft.com/en-us/products/storage/blobs>
- Microsoft, Azure Blob Storage documentation. Disponível em: <https://learn.microsoft.com/en-us/azure/storage/blobs/>
- Google Cloud. Disponível em: <https://cloud.google.com/storage?hl=pt-br>
- Visão geral do produto do Cloud Storage. Disponível em: <https://cloud.google.com/storage/docs/introduction?hl=pt-br>
‌

## <a name="c6"></a>6. Anexos

[Sprint Review I](https://www.canva.com/design/DAFrFGSKjw0/oe9IhcXMH_9KsHdEP6TMmg/view?utm_content=DAFrFGSKjw0&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)

[Sprint Review II](https://www.canva.com/design/DAFsezWj6G8/k5_YWZQpT-0tRk_oKZqqyA/view?utm_content=DAFsezWj6G8&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)

[Sprint Review III](https://www.canva.com/design/DAFtrVBGD40/Gh6CCNog3VIQb3NlyFzUjw/view?utm_content=DAFtrVBGD40&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)
