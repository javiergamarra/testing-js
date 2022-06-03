# Diamonds

Dada una mina de diamantes, representada mediante una cadena de caracteres '<' y '>' de cualquier longitud y orden, devolver el número de diamantes que existen en la mina. Un diamante está formado por el símbolo '<' seguido de '>', esto es "<>".

Hay que tener en cuenta que cada vez que se extrae un diamante podría formarse otro. Simulad 100ms de retraso cada vez que “minamos” un diamante.

¿Cómo lo probamos?

Ejemplos:

Mina (Entrada)	#Diamantes (Salida)	Explicación
""	0	Mina vacía por tanto 0 diamantes
"<>"	1	Mina con un único diamante
"<<>>"	2	Mina con un diamante entero y otro que se forma al extraer el primero
"<><<>><<"	3	Mina con dos diamantes y un tercero que se forma con la extracción del segundo