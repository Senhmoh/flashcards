import { useState, useEffect, useCallback, useRef } from "react";

const ALL_CARDS = [{"id":"f001","domain":"General Security Concepts","category":"Concept","front":"3 catégories de Security Controls","back":"Technical (systèmes, firewalls, AV)\nManagerial (politiques, procédures)\nOperational (gardes, formations)"},{"id":"f002","domain":"General Security Concepts","category":"Concept","front":"7 types de Security Controls","back":"Preventive · Deterrent · Detective\nCorrective · Compensating · Directive · Physical"},{"id":"f003","domain":"General Security Concepts","category":"Concept","front":"Preventive control","back":"Bloque l'accès avant qu'il se produise\nEx : firewall rules, door locks, guard shack"},{"id":"f004","domain":"General Security Concepts","category":"Concept","front":"Detective control","back":"Identifie et log une tentative d'intrusion\nEx : SIEM, IDS, motion detectors, log review"},{"id":"f005","domain":"General Security Concepts","category":"Concept","front":"Corrective control","back":"Appliqué APRÈS un événement pour corriger\nEx : restore from backup après ransomware"},{"id":"f006","domain":"General Security Concepts","category":"Concept","front":"Compensating control","back":"Contrôle alternatif quand le contrôle principal est insuffisant\nEx : firewall block à la place d'un patch"},{"id":"f007","domain":"General Security Concepts","category":"Concept","front":"Deterrent control","back":"Décourage une attaque sans bloquer directement\nEx : warning signs, splash screens, threat of demotion"},{"id":"f008","domain":"General Security Concepts","category":"Concept","front":"Directive control","back":"Oriente vers la conformité (contrôle faible)\nEx : policies, training, security procedures"},{"id":"f009","domain":"General Security Concepts","category":"Concept","front":"CIA Triad (3 principes)","back":"Confidentiality – accès autorisés seulement\nIntegrity – données non modifiées sans détection\nAvailability – systèmes toujours accessibles"},{"id":"f010","domain":"General Security Concepts","category":"Concept","front":"Non-repudiation","back":"L'expéditeur ne peut pas nier ses actions\nImplémenté via : signature numérique (clé privée)\nVérifié via : clé publique"},{"id":"f011","domain":"General Security Concepts","category":"Concept","front":"AAA Framework","back":"Authentication – prouver son identité\nAuthorization – accès selon les droits\nAccounting – tracer les actions (logs)"},{"id":"f012","domain":"General Security Concepts","category":"Concept","front":"Zero Trust – 3 composants clés","back":"Policy Engine – évalue chaque décision d'accès\nPolicy Administrator – communique avec PEP\nPolicy Enforcement Point – applique la décision"},{"id":"f013","domain":"General Security Concepts","category":"Concept","front":"Zero Trust – Control Plane vs Data Plane","back":"Control Plane : Policy Engine + Policy Administrator\nData Plane : Policy Enforcement Point (PEP)\n→ Sépare la décision de l'application"},{"id":"f014","domain":"General Security Concepts","category":"Concept","front":"Gap Analysis","back":"Comparer l'état actuel vs l'état désiré en sécurité\nIdentifie les faiblesses et processus à améliorer"},{"id":"f015","domain":"General Security Concepts","category":"Composant","front":"Access Control Vestibule (Mantrap)","back":"Double porte = 2 authentifications successives\nBloque le tailgating/piggybacking"},{"id":"f016","domain":"General Security Concepts","category":"Composant","front":"Bollards / Barricades","back":"Barrières physiques contre les véhicules\nDirigent les personnes vers un point d'accès contrôlé"},{"id":"f017","domain":"General Security Concepts","category":"Composant","front":"Two-person integrity (TPI)","back":"Aucune personne seule n'a accès à un asset critique\nRequiert 2 personnes simultanément"},{"id":"f018","domain":"General Security Concepts","category":"Composant","front":"Sensors : types","back":"Infrared (IR) – détecte chaleur corporelle (obscurité)\nMicrowave – moins affecté par température\nUltrasonic – ondes sonores\nPressure-sensitive mats – poids/pression\nThermal – variations de chaleur"},{"id":"f019","domain":"General Security Concepts","category":"Concept","front":"Honeytoken","back":"Donnée fictive placée dans un système réel\nSurveilleé → alerte si accédée par un intrus\nEx : fake credentials, fake records in DB"},{"id":"f020","domain":"General Security Concepts","category":"Concept","front":"Honeypot","back":"Système entier factice qui attire les attaquants\nPeut révéler les TTPs de l'attaquant"},{"id":"f021","domain":"General Security Concepts","category":"Concept","front":"Honeynet","back":"Réseau de honeypots interconnectés\nSimule un environnement réseau complet"},{"id":"f022","domain":"General Security Concepts","category":"Concept","front":"DNS Sinkhole","back":"Redirige les requêtes DNS malveillantes vers une IP contrôlée\nPeut identifier les machines infectées"},{"id":"f023","domain":"General Security Concepts","category":"Concept","front":"Change Management – étapes clés","back":"1. Request de changement\n2. Impact analysis (risques high/med/low)\n3. Approbation\n4. Implémentation\n5. Documentation"},{"id":"f024","domain":"General Security Concepts","category":"Concept","front":"Impact Analysis (Change Mgmt)","back":"Évalue le risque d'un changement\nQuestions : le fix casse-t-il autre chose ? Risque de ne pas changer ?"},{"id":"f025","domain":"General Security Concepts","category":"Cryptographie","front":"PKI (Public Key Infrastructure)","back":"Système complet : policies, procédures, hardware, software, personnes\nGère : création, distribution, gestion, révocation des certificats"},{"id":"f026","domain":"General Security Concepts","category":"Cryptographie","front":"Asymmetric encryption","back":"Clé publique chiffre → clé privée déchiffre\nLent mais sécurisé pour l'échange de clés\nEx : RSA, ECC"},{"id":"f027","domain":"General Security Concepts","category":"Cryptographie","front":"Symmetric encryption","back":"Même clé pour chiffrer ET déchiffrer\nRapide, utilisé pour le bulk data\nEx : AES, DES, 3DES"},{"id":"f028","domain":"General Security Concepts","category":"Cryptographie","front":"Key Exchange – Diffie-Hellman","back":"Permet d'établir une clé symétrique partagée sur un canal non sécurisé\nSans jamais transmettre la clé elle-même"},{"id":"f029","domain":"General Security Concepts","category":"Cryptographie","front":"Session key / Ephemeral key","back":"Clé temporaire générée pour une session\nDoit changer régulièrement et être imprévisible\nForward secrecy : compromis d'une clé ne compromet pas les sessions passées"},{"id":"f030","domain":"General Security Concepts","category":"Cryptographie","front":"AES (Advanced Encryption Standard)","back":"Symétrique | 128, 192, ou 256 bits\nStandard actuel pour chiffrement symétrique"},{"id":"f031","domain":"General Security Concepts","category":"Cryptographie","front":"RSA","back":"Asymétrique | Clés 1024-4096 bits\nBasé sur factorisation de grands nombres premiers"},{"id":"f032","domain":"General Security Concepts","category":"Cryptographie","front":"ECC (Elliptic Curve Cryptography)","back":"Asymétrique | Clés plus courtes = même sécurité que RSA\n256-bit ECC ≈ 3072-bit RSA"},{"id":"f033","domain":"General Security Concepts","category":"Cryptographie","front":"DES / 3DES","back":"DES : 56 bits (obsolète, cassé)\n3DES : 3x DES = 112/168 bits effectifs (déprécié depuis 2023)"},{"id":"f034","domain":"General Security Concepts","category":"Cryptographie","front":"SHA (Secure Hash Algorithm) – variantes","back":"SHA-1 : 160 bits (obsolète, collisions trouvées)\nSHA-256 : 256 bits (standard actuel)\nSHA-512 : 512 bits (haute sécurité)"},{"id":"f035","domain":"General Security Concepts","category":"Cryptographie","front":"MD5 (Message Digest 5)","back":"128 bits | Obsolète et vulnérable aux collisions\nNE PAS utiliser pour intégrité ou signatures"},{"id":"f036","domain":"General Security Concepts","category":"Cryptographie","front":"HMAC","back":"Hash-based Message Authentication Code\nCombinaison hash + clé secrète = intégrité + authenticité"},{"id":"f037","domain":"General Security Concepts","category":"Cryptographie","front":"Salt (dans le hachage)","back":"Valeur aléatoire ajoutée au mot de passe AVANT le hash\nRend les rainbow tables inefficaces\nStocké avec le hash"},{"id":"f038","domain":"General Security Concepts","category":"Cryptographie","front":"Rainbow Table","back":"Table précalculée hash → mot de passe\nContré par le salage des hashs"},{"id":"f039","domain":"General Security Concepts","category":"Cryptographie","front":"TPM (Trusted Platform Module)","back":"Puce cryptographique intégrée dans le hardware\nStocke les clés BitLocker, génère nombres aléatoires\nProtégé contre les dictionary attacks"},{"id":"f040","domain":"General Security Concepts","category":"Cryptographie","front":"HSM (Hardware Security Module)","back":"Device hardware dédié au stockage sécurisé de milliers de clés\nPour grands environnements, accélération crypto\nEx : cartes plug-in ou devices séparés"},{"id":"f041","domain":"General Security Concepts","category":"Cryptographie","front":"Obfuscation techniques","back":"Steganography : cacher données dans image/audio\nTokenization : remplacer données sensibles par token\nData masking : masquer les vraies valeurs"},{"id":"f042","domain":"General Security Concepts","category":"Composant","front":"X.509","back":"Standard de format pour les certificats numériques\nContient : numéro série, clé publique, émetteur, sujet, validité"},{"id":"f043","domain":"General Security Concepts","category":"Composant","front":"CA (Certificate Authority)","back":"Entité de confiance qui signe les certificats\nInterne (private CA) ou externe (DigiCert, Comodo...)"},{"id":"f044","domain":"General Security Concepts","category":"Composant","front":"CSR (Certificate Signing Request)","back":"Requête envoyée à la CA pour obtenir un certificat\nContient : clé publique + informations du demandeur"},{"id":"f045","domain":"General Security Concepts","category":"Composant","front":"Wildcard Certificate","back":"Sécurise un domaine + TOUS ses sous-domaines\nEx : *.example.com → shop.example.com, blog.example.com"},{"id":"f046","domain":"General Security Concepts","category":"Composant","front":"SAN Certificate (Subject Alternative Names)","back":"Un certificat couvrant PLUSIEURS domaines distincts\nEx : example.com ET example.org sur le même cert"},{"id":"f047","domain":"General Security Concepts","category":"Composant","front":"EV Certificate (Extended Validation)","back":"Validation la plus stricte, barre verte dans browser\nRequiert vérification légale approfondie de l'organisation"},{"id":"f048","domain":"General Security Concepts","category":"Composant","front":"CRL (Certificate Revocation List)","back":"Liste des certificats révoqués publiée par la CA\nAlternative : OCSP (Online Certificate Status Protocol) – vérification temps réel"},{"id":"f049","domain":"General Security Concepts","category":"Composant","front":"OCSP (Online Certificate Status Protocol)","back":"Vérification temps réel du statut d'un certificat\nPlus efficace que CRL (pas de liste à télécharger)"},{"id":"f050","domain":"General Security Concepts","category":"Composant","front":"Self-signed certificate","back":"Signé par sa propre clé privée (pas de CA tiers)\nNon approuvé par défaut par les browsers\nOK pour usage interne seulement"},{"id":"f051","domain":"Threats & Vulnerabilities","category":"Concept","front":"APT (Advanced Persistent Threat)","back":"Acteur étatique ou très sophistiqué\nObjectif : accès long terme discret\nEx : groupes sponsorisés par des nations"},{"id":"f052","domain":"Threats & Vulnerabilities","category":"Concept","front":"Hacktiviste","back":"Pirate motivé par idéologie ou cause politique\nEx : Anonymous"},{"id":"f053","domain":"Threats & Vulnerabilities","category":"Concept","front":"Insider Threat","back":"Menace interne : employé, contractuel, partenaire\nAccès légitimes → difficile à détecter"},{"id":"f054","domain":"Threats & Vulnerabilities","category":"Concept","front":"Script Kiddie","back":"Attaquant peu qualifié utilisant des outils existants\nMotivation : notoriété ou curiosité"},{"id":"f055","domain":"Threats & Vulnerabilities","category":"Concept","front":"Shadow IT","back":"Systèmes/services IT utilisés sans approbation du département IT\nRisque : données hors contrôle"},{"id":"f056","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Phishing","back":"Email frauduleux imitant entité légitime\nVariantes : Spear phishing (ciblé), Whaling (C-level), Vishing (voix), Smishing (SMS)"},{"id":"f057","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Spear Phishing","back":"Phishing ciblé sur une personne/groupe spécifique\nUtilise des infos personnelles pour paraître légitime"},{"id":"f058","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Whaling","back":"Phishing ciblant les dirigeants (CEO, CFO...)\nGains potentiels élevés → emails très élaborés"},{"id":"f059","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Vishing","back":"Voice phishing – appels téléphoniques frauduleux\nSe fait passer pour banque, support IT..."},{"id":"f060","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Smishing","back":"SMS phishing – liens malveillants par SMS"},{"id":"f061","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Watering Hole Attack","back":"Compromettre un site web fréquenté par les victimes cibles\nAttaque indirecte via un site de confiance"},{"id":"f062","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Tailgating / Piggybacking","back":"Suivre physiquement une personne autorisée dans une zone sécurisée\nContré par : mantraps, sensibilisation"},{"id":"f063","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Pretexting","back":"Créer un scénario fictif crédible pour obtenir des infos\nEx : se faire passer pour IT support"},{"id":"f064","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Business Email Compromise (BEC)","back":"Compromettre ou usurper un email professionnel\nObjectif : virement frauduleux ou extraction de données"},{"id":"f065","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Typosquatting / URL Hijacking","back":"Enregistrer un domaine mal orthographié (gooogle.com)\nRedirige les victimes vers site malveillant"},{"id":"f066","domain":"Threats & Vulnerabilities","category":"Malware","front":"Virus","back":"Nécessite l'exécution d'un programme par l'utilisateur\nSe reproduit dans le système de fichiers\nTypes : program, boot sector, script, macro"},{"id":"f067","domain":"Threats & Vulnerabilities","category":"Malware","front":"Worm","back":"Se auto-réplique SANS action de l'utilisateur\nSe propage via le réseau\nContré par : firewalls, IDS/IPS"},{"id":"f068","domain":"Threats & Vulnerabilities","category":"Malware","front":"Ransomware","back":"Chiffre les données et demande une rançon pour la clé\nOS reste accessible, mais fichiers inutilisables\nPrévention : backups offline + patching"},{"id":"f069","domain":"Threats & Vulnerabilities","category":"Malware","front":"Trojan Horse","back":"Logiciel malveillant déguisé en app légitime\nNe se réplique pas seul → requiert installation par l'utilisateur"},{"id":"f070","domain":"Threats & Vulnerabilities","category":"Malware","front":"Rootkit","back":"S'installe au niveau OS/kernel pour cacher sa présence\nTrès difficile à détecter et supprimer\nDetectable : bootable AV scan, integrity checks"},{"id":"f071","domain":"Threats & Vulnerabilities","category":"Malware","front":"Keylogger","back":"Enregistre les frappes clavier\nCapture credentials, messages privés"},{"id":"f072","domain":"Threats & Vulnerabilities","category":"Malware","front":"Spyware","back":"Collecte des informations sans consentement\nEx : historique navigation, screenshots, keystrokes"},{"id":"f073","domain":"Threats & Vulnerabilities","category":"Malware","front":"Fileless Malware","back":"S'exécute en mémoire UNIQUEMENT (pas de fichier sur disque)\nÉvite la détection par antivirus basé sur signatures"},{"id":"f074","domain":"Threats & Vulnerabilities","category":"Malware","front":"Logic Bomb","back":"Code malveillant déclenché par une condition spécifique\nEx : déclenché si l'employé est viré"},{"id":"f075","domain":"Threats & Vulnerabilities","category":"Malware","front":"Botnet / Zombie","back":"Réseau de machines compromises contrôlées par C2\nUtilisé pour : DDoS, spam, mining crypto"},{"id":"f076","domain":"Threats & Vulnerabilities","category":"Malware","front":"RAT (Remote Access Trojan)","back":"Backdoor donnant contrôle total à l'attaquant\nSouvent combiné avec d'autres malwares"},{"id":"f077","domain":"Threats & Vulnerabilities","category":"Malware","front":"Bloatware","back":"Logiciels indésirables pré-installés\nPeut inclure des comportements de type spyware"},{"id":"f078","domain":"Threats & Vulnerabilities","category":"Attaque","front":"DoS vs DDoS","back":"DoS : une seule source attaque\nDDoS : multiples sources (botnet) simultanément\nTypes : volumétrique, protocol, application layer"},{"id":"f079","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Smurf Attack","back":"DDoS amplifié via broadcast ICMP\nAdresse IP source spoofée → flood de réponses"},{"id":"f080","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Amplification Attack","back":"Envoyer petites requêtes à des serveurs ouverts\nLes réponses (beaucoup plus grandes) saturent la victime\nEx : DNS amplification, NTP amplification"},{"id":"f081","domain":"Threats & Vulnerabilities","category":"Attaque","front":"DNS Poisoning","back":"Corrompre le cache DNS pour rediriger vers fausse IP\nUtilisateurs croient aller sur le vrai site"},{"id":"f082","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Domain Hijacking","back":"Prendre le contrôle de l'enregistrement d'un domaine\nModifie les entrées DNS sans toucher aux serveurs"},{"id":"f083","domain":"Threats & Vulnerabilities","category":"Attaque","front":"On-Path Attack (MITM)","back":"Attaquant intercepte et peut modifier le trafic réseau\nRequiert accès au flux réseau\nContré par : chiffrement, certificats"},{"id":"f084","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Replay Attack","back":"Capturer un token/session valide et le réutiliser\nContré par : timestamps, nonces, session tokens courts"},{"id":"f085","domain":"Threats & Vulnerabilities","category":"Attaque","front":"SSL Stripping","back":"Forcer une connexion HTTPS → HTTP\nVariante d'on-path attack\nContré par : HSTS (HTTP Strict Transport Security)"},{"id":"f086","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Wireless Deauthentication Attack","back":"Envoyer des trames 802.11 deauth pour déconnecter les clients\nDoS wireless → peut forcer reconnexion sur Evil Twin"},{"id":"f087","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Evil Twin","back":"Point d'accès WiFi malveillant imitant un AP légitime\nCapture le trafic des victimes connectées"},{"id":"f088","domain":"Threats & Vulnerabilities","category":"Attaque","front":"RF Jamming","back":"Émettre des signaux radio pour bloquer les communications wireless\nDoS physique intentionnel"},{"id":"f089","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Bluejacking vs Bluesnarfing","back":"Bluejacking : envoyer messages non sollicités via Bluetooth\nBluesnarfing : voler des données via Bluetooth (attaque)"},{"id":"f090","domain":"Threats & Vulnerabilities","category":"Attaque","front":"SQL Injection (SQLi)","back":"Insérer du code SQL malveillant dans un champ de saisie\nPermets : lecture, modification, suppression de DB\nContré par : parameterized queries, input validation"},{"id":"f091","domain":"Threats & Vulnerabilities","category":"Attaque","front":"XSS (Cross-Site Scripting)","back":"Injecter du script malveillant dans une page web vue par d'autres\nStored XSS (persistant) vs Reflected XSS (non persistant)\nContré par : output encoding, CSP headers"},{"id":"f092","domain":"Threats & Vulnerabilities","category":"Attaque","front":"CSRF (Cross-Site Request Forgery)","back":"Forcer un utilisateur authentifié à exécuter une action non voulue\nContré par : CSRF tokens, SameSite cookies"},{"id":"f093","domain":"Threats & Vulnerabilities","category":"Attaque","front":"SSRF (Server-Side Request Forgery)","back":"Forcer le serveur à faire des requêtes vers des ressources internes\nEx : accéder au metadata cloud (169.254.169.254)"},{"id":"f094","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Directory Traversal","back":"../../../etc/passwd – remonter l'arborescence pour accéder à des fichiers non autorisés\nContré par : input validation, chroot jail"},{"id":"f095","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Buffer Overflow","back":"Écriture au-delà de la zone mémoire allouée\nEcrase d'autres zones mémoire → exécution de code arbitraire\nContré par : bounds checking, ASLR, DEP"},{"id":"f096","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Race Condition / TOCTOU","back":"Time-of-Check to Time-of-Use\nExploite un délai entre vérification et utilisation d'une ressource"},{"id":"f097","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Privilege Escalation","back":"Obtenir des droits supérieurs à ceux autorisés\nHorizontal (autre user) vs Vertical (admin)"},{"id":"f098","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Birthday Attack","back":"Exploite la probabilité de collision dans les fonctions de hachage\n23 élèves → 50% chance d'avoir même anniversaire\nCible : algorithmes avec petits espaces de hash"},{"id":"f099","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Downgrade Attack","back":"Forcer la négociation vers un protocole moins sécurisé\nEx : POODLE (SSL 3.0 forced), BEAST\nContré par : désactiver protocoles obsolètes"},{"id":"f100","domain":"Threats & Vulnerabilities","category":"Attaque","front":"POODLE Attack","back":"Padding Oracle On Downgraded Legacy Encryption\nForce fallback vers SSL 3.0 (vulnérable)\nOn-path attack + downgrade"},{"id":"f101","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Pass-the-Hash","back":"Utiliser le hash NTLM volé directement (sans le déchiffrer)\nFonctionne sur systèmes Windows\nContré par : Credential Guard, limiter NTLM"},{"id":"f102","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Brute Force Attack","back":"Essayer TOUTES les combinaisons possibles\nLent mais exhaustif\nContré par : lockout policy, long passwords"},{"id":"f103","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Dictionary Attack","back":"Essayer des mots du dictionnaire et variantes\nPlus rapide que brute force\nContré par : complexity requirements, salting"},{"id":"f104","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Password Spraying","back":"Essayer 1-3 mots de passe communs sur TOUS les comptes\nÉvite le lockout en restant sous le seuil\nContré par : MFA, surveillance des tentatives anormales"},{"id":"f105","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Credential Stuffing","back":"Utiliser des credentials volés d'autres breaches\nExploite la réutilisation des mots de passe\nContré par : MFA, password managers"},{"id":"f106","domain":"Threats & Vulnerabilities","category":"Concept","front":"Zero-day Vulnerability","back":"Vulnérabilité inconnue du vendeur / pas encore patchée\nWindow of vulnerability = 0 jour de préavis"},{"id":"f107","domain":"Threats & Vulnerabilities","category":"Concept","front":"CVE (Common Vulnerabilities and Exposures)","back":"Identifiant standardisé pour les vulnérabilités connues\nFormat : CVE-ANNÉE-NUMÉRO"},{"id":"f108","domain":"Threats & Vulnerabilities","category":"Concept","front":"CVSS (Common Vulnerability Scoring System)","back":"Score 0-10 mesurant la criticité d'une vulnérabilité\n0-3.9 Low | 4.0-6.9 Medium | 7.0-8.9 High | 9.0-10 Critical"},{"id":"f109","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Supply Chain Attack","back":"Compromettre un fournisseur/logiciel tiers pour atteindre la cible\nEx : SolarWinds (2020), NotPetya via MeDoc"},{"id":"f110","domain":"Threats & Vulnerabilities","category":"Concept","front":"Indicators of Compromise (IoC)","back":"Preuves qu'un système a été compromis\nEx : unusual outbound traffic, unknown processes, modified files, new admin accounts"},{"id":"f111","domain":"Threats & Vulnerabilities","category":"Concept","front":"Patch Management","back":"Processus d'application des correctifs de sécurité\nOrdre : critique > haute > moyenne > basse\nTester avant déploiement en production"},{"id":"f112","domain":"Threats & Vulnerabilities","category":"Concept","front":"Network Segmentation","back":"Diviser le réseau en zones isolées (VLANs, DMZ)\nLimite la propagation d'une attaque"},{"id":"f113","domain":"Threats & Vulnerabilities","category":"Concept","front":"Hardening","back":"Réduire la surface d'attaque d'un système\nEx : désactiver services inutiles, fermer ports, changer credentials par défaut"},{"id":"f114","domain":"Threats & Vulnerabilities","category":"Concept","front":"Application Allow List (Whitelist)","back":"Seules les applications approuvées peuvent s'exécuter\nPlus sécurisé que blacklist"},{"id":"f115","domain":"Security Architecture","category":"Concept","front":"IaaS / PaaS / SaaS","back":"IaaS : Infrastructure (serveurs, réseau) – ex: AWS EC2\nPaaS : Plateforme (runtime, DB) – ex: Google App Engine\nSaaS : Application complète – ex: Office 365, Salesforce"},{"id":"f116","domain":"Security Architecture","category":"Concept","front":"Cloud modèles de déploiement","back":"Public : partagé, géré par fournisseur\nPrivate : dédié à une org, on-prem ou hébergé\nHybrid : combinaison public + private\nCommunity : partagé entre orgs similaires"},{"id":"f117","domain":"Security Architecture","category":"Concept","front":"Shared Responsibility Model","back":"Fournisseur : sécurité de l'infrastructure cloud\nClient : sécurité dans le cloud (données, accès, config)\nIaaS: +responsabilité client | SaaS: –responsabilité client"},{"id":"f118","domain":"Security Architecture","category":"Concept","front":"CASB (Cloud Access Security Broker)","back":"Proxy entre utilisateurs et services cloud\nVisibilité et contrôle sur l'utilisation des apps cloud\nShadow IT detection"},{"id":"f119","domain":"Security Architecture","category":"Composant","front":"VPC (Virtual Private Cloud)","back":"Réseau privé isolé au sein d'un cloud public\nContrôle des adresses IP, subnets, routing, gateways"},{"id":"f120","domain":"Security Architecture","category":"Concept","front":"Serverless / FaaS","back":"Code exécuté à la demande sans gérer de serveurs\nEx : AWS Lambda\nRisque : erreurs de config IAM, injection"},{"id":"f121","domain":"Security Architecture","category":"Composant","front":"DMZ (Demilitarized Zone)","back":"Zone réseau entre internet et réseau interne\nContient : serveurs web, email, DNS publics\nProtégée par 2 firewalls"},{"id":"f122","domain":"Security Architecture","category":"Composant","front":"VLAN (Virtual LAN)","back":"Segmentation logique d'un réseau physique\nSécurité : trafic isolé entre VLANs par défaut\nVLAN hopping attack : exploiter double tagging 802.1Q"},{"id":"f123","domain":"Security Architecture","category":"Composant","front":"NAT (Network Address Translation)","back":"Traduit adresses IP privées → publiques\nCache la topologie interne du réseau\nPAT : une seule IP publique pour plusieurs hôtes"},{"id":"f124","domain":"Security Architecture","category":"Composant","front":"Proxy Server","back":"Intermédiaire entre client et internet\nForward proxy : filtre le trafic sortant\nReverse proxy : protège les serveurs internes"},{"id":"f125","domain":"Security Architecture","category":"Composant","front":"Load Balancer","back":"Distribue le trafic entre plusieurs serveurs\nHaute disponibilité + performance\nPeut effectuer terminaison SSL"},{"id":"f126","domain":"Security Architecture","category":"Composant","front":"Jump Server / Bastion Host","back":"Serveur intermédiaire pour accéder aux systèmes dans une zone sécurisée\nPoint d'entrée unique et contrôlé → facilite l'audit"},{"id":"f127","domain":"Security Architecture","category":"Composant","front":"Air Gap","back":"Isolement physique total d'un réseau (pas de connexion externe)\nEx : systèmes industriels critiques, réseaux classifiés"},{"id":"f128","domain":"Security Architecture","category":"Composant","front":"Stateless vs Stateful Firewall","back":"Stateless : examine chaque paquet individuellement (ACL)\nStateful : suit l'état des connexions → plus intelligent"},{"id":"f129","domain":"Security Architecture","category":"Composant","front":"NGFW (Next-Generation Firewall)","back":"Firewall couche 7 (Application Layer)\nDPI (Deep Packet Inspection) + IPS intégré\nIdentifie les apps, pas juste les ports"},{"id":"f130","domain":"Security Architecture","category":"Composant","front":"WAF (Web Application Firewall)","back":"Filtre trafic HTTP/HTTPS vers applications web\nBloque : SQLi, XSS, CSRF...\nOpère au niveau applicatif (L7)"},{"id":"f131","domain":"Security Architecture","category":"Composant","front":"IDS vs IPS","back":"IDS (Intrusion Detection) : détecte et alerte SEULEMENT\nIPS (Intrusion Prevention) : détecte ET bloque\nNIDS/NIPS : réseau | HIDS/HIPS : hôte"},{"id":"f132","domain":"Security Architecture","category":"Composant","front":"IDS – Signature-based vs Anomaly-based","back":"Signature : compare à des patterns connus (zero-days non détectés)\nAnomaly/Behavior : détecte les déviations du comportement normal"},{"id":"f133","domain":"Security Architecture","category":"Protocole/Port","front":"Ports standards – Services non sécurisés","back":"FTP : 21 | Telnet : 23 | SMTP : 25\nHTTP : 80 | POP3 : 110 | IMAP : 143"},{"id":"f134","domain":"Security Architecture","category":"Protocole/Port","front":"Ports standards – Services sécurisés","back":"SSH : 22 | HTTPS : 443 | SMTPS : 465\nIMAPS : 993 | POP3S : 995 | LDAPS : 636"},{"id":"f135","domain":"Security Architecture","category":"Protocole/Port","front":"Ports importants à mémoriser","back":"DNS : 53 (UDP/TCP) | DHCP : 67/68\nRDP : 3389 | SNMP : 161 | NTP : 123\nSMB : 445 | Kerberos : 88 | RADIUS : 1812"},{"id":"f136","domain":"Security Architecture","category":"Protocole/Port","front":"SSH (Secure Shell)","back":"Port 22 | Remplace Telnet (non chiffré)\nAuthentification : password ou clé publique/privée\nTunnel sécurisé pour SFTP, port forwarding"},{"id":"f137","domain":"Security Architecture","category":"Protocole/Port","front":"TLS vs SSL","back":"SSL : obsolète et vulnérable (SSLv2, SSLv3)\nTLS : standard actuel (TLS 1.2, TLS 1.3)\nTLS 1.3 : plus rapide, forward secrecy par défaut"},{"id":"f138","domain":"Security Architecture","category":"Protocole/Port","front":"DNSSEC","back":"Extension DNS ajoutant signatures numériques\nGarantit authenticité et intégrité des réponses DNS\nPas de chiffrement, juste intégrité"},{"id":"f139","domain":"Security Architecture","category":"Protocole/Port","front":"SFTP vs FTPS vs SCP","back":"SFTP : FTP over SSH (port 22) → 1 seul port\nFTPS : FTP over TLS (ports 21, 990)\nSCP : Secure Copy over SSH (port 22)"},{"id":"f140","domain":"Security Architecture","category":"Protocole/Port","front":"LDAP vs LDAPS","back":"LDAP : port 389 (non chiffré) – annuaire\nLDAPS : port 636 (chiffré via TLS)\nUtilisé pour authentification Active Directory"},{"id":"f141","domain":"Security Architecture","category":"Protocole/Port","front":"SNMP versions de sécurité","back":"SNMPv1/v2 : community strings en clair (non sécurisé)\nSNMPv3 : authentification + chiffrement (utilisez ce version!)"},{"id":"f142","domain":"Security Architecture","category":"Protocole/Port","front":"S/MIME","back":"Secure/Multipurpose Internet Mail Extensions\nChiffrement et signature d'emails\nRequiert certificats PKI pour chaque utilisateur"},{"id":"f143","domain":"Security Architecture","category":"Composant","front":"DKIM / DMARC / SPF","back":"SPF : liste les serveurs autorisés à envoyer pour un domaine\nDKIM : signature cryptographique des emails\nDMARC : politique si SPF/DKIM échoue (reject/quarantine)"},{"id":"f144","domain":"Security Architecture","category":"Composant","front":"VPN – types","back":"Site-to-site : connecte 2 réseaux entiers\nRemote access : connexion d'un utilisateur au réseau\nAlways-on VPN : toujours connecté (entreprise)"},{"id":"f145","domain":"Security Architecture","category":"Protocole/Port","front":"IPSec – modes","back":"Transport mode : chiffre payload seulement (host-to-host)\nTunnel mode : chiffre tout le paquet (VPN gateway)\nUtilise : AH (intégrité) + ESP (chiffrement)"},{"id":"f146","domain":"Security Architecture","category":"Composant","front":"Split tunneling","back":"Seul le trafic vers le réseau d'entreprise passe par le VPN\nTrafic internet normal = connexion directe\nRisque si hôte compromis"},{"id":"f147","domain":"Security Architecture","category":"Concept","front":"Data states (3 états)","back":"Data at Rest : stocké sur disque\nData in Transit : en cours de transfert réseau\nData in Use : en cours de traitement (mémoire)"},{"id":"f148","domain":"Security Architecture","category":"Concept","front":"Data Classifications","back":"Public | Internal | Confidential | Restricted/Secret\nGouvernemental : Unclassified > Confidential > Secret > Top Secret"},{"id":"f149","domain":"Security Architecture","category":"Concept","front":"DLP (Data Loss Prevention)","back":"Détecte et prévient la fuite de données sensibles\nInspecte : emails, web, endpoints, stockage\nEx : bloquer envoi de numéro CB par email"},{"id":"f150","domain":"Security Architecture","category":"Concept","front":"Data Sovereignty","back":"Les données sont soumises aux lois du pays où elles sont stockées\nEx : RGPD impose stockage EU pour citoyens EU"},{"id":"f151","domain":"Security Architecture","category":"Concept","front":"RAID – niveaux clés","back":"RAID 0 : striping (perf, pas de redondance)\nRAID 1 : mirroring (redondance)\nRAID 5 : striping + parity (3 disques min)\nRAID 10 : mirroring + striping (perf + redondance)"},{"id":"f152","domain":"Security Architecture","category":"Concept","front":"RTO vs RPO","back":"RTO (Recovery Time Objective) : temps max acceptable pour restaurer\nRPO (Recovery Point Objective) : perte de données max acceptable"},{"id":"f153","domain":"Security Architecture","category":"Concept","front":"Hot site vs Warm site vs Cold site","back":"Hot : infrastructure répliquée prête (coût élevé, RTO < heures)\nWarm : infra partielle (RTO jours)\nCold : espace vide, équipements à installer (RTO semaines)"},{"id":"f154","domain":"Security Architecture","category":"Concept","front":"MTBF vs MTTR","back":"MTBF (Mean Time Between Failures) : temps moyen entre pannes\nMTTR (Mean Time To Repair) : temps moyen de réparation"},{"id":"f155","domain":"Security Operations","category":"Concept","front":"Principle of Least Privilege","back":"Accorder uniquement les permissions strictement nécessaires\nRéduire la surface d'attaque interne"},{"id":"f156","domain":"Security Operations","category":"Concept","front":"Separation of Duties","back":"Aucune personne ne doit avoir contrôle complet sur un processus critique\nEx : développeur ≠ déployeur en production"},{"id":"f157","domain":"Security Operations","category":"Concept","front":"Need to Know","back":"Accès à l'information uniquement si nécessaire pour la mission\nComplément du principe de moindre privilège"},{"id":"f158","domain":"Security Operations","category":"Concept","front":"Job Rotation","back":"Rotation des employés sur différents postes\nDétecte la fraude, évite la dépendance, réduit colluisons"},{"id":"f159","domain":"Security Operations","category":"Concept","front":"Mandatory Vacation","back":"Congés obligatoires permettent l'audit et détection de fraudes"},{"id":"f160","domain":"Security Operations","category":"Concept","front":"Provisioning vs Deprovisioning","back":"Provisioning : créer compte + droits lors embauche\nDeprovisioning : supprimer compte + droits lors départ\nCritique pour éviter les accès orphelins"},{"id":"f161","domain":"Security Operations","category":"Concept","front":"DAC (Discretionary Access Control)","back":"Le propriétaire de la ressource décide des accès\nFlexible mais difficile à gérer à grande échelle\nEx : permissions fichiers Unix"},{"id":"f162","domain":"Security Operations","category":"Concept","front":"MAC (Mandatory Access Control)","back":"Accès basé sur labels/classifications définis par admin\nTrès strict, utilisé dans environnements gouvernementaux/militaires"},{"id":"f163","domain":"Security Operations","category":"Concept","front":"RBAC (Role-Based Access Control)","back":"Accès basé sur le rôle de l'utilisateur dans l'organisation\nLe plus courant en entreprise"},{"id":"f164","domain":"Security Operations","category":"Concept","front":"ABAC (Attribute-Based Access Control)","back":"Accès basé sur des attributs (user, ressource, environnement)\nTrès granulaire et flexible"},{"id":"f165","domain":"Security Operations","category":"Concept","front":"Rule-Based Access Control","back":"Accès basé sur des règles définies par admin\nEx : ACL de firewall (pas le même que RBAC!)"},{"id":"f166","domain":"Security Operations","category":"Composant","front":"MFA – 4 facteurs","back":"Something you know : password, PIN\nSomething you have : token, smartcard, téléphone\nSomething you are : biométrie\nSomewhere you are : géolocalisation"},{"id":"f167","domain":"Security Operations","category":"Composant","front":"TOTP vs HOTP","back":"TOTP : Time-based OTP (expire après ~30 sec) – ex: Google Authenticator\nHOTP : HMAC-based OTP (basé sur compteur, n'expire pas)"},{"id":"f168","domain":"Security Operations","category":"Composant","front":"SSO (Single Sign-On)","back":"Une seule authentification donne accès à plusieurs services\nEx : authentification Microsoft puis accès O365, Teams, SharePoint"},{"id":"f169","domain":"Security Operations","category":"Composant","front":"SAML","back":"Security Assertion Markup Language\nProtocole SSO fédéré basé XML\nEx : connexion avec compte Google pour app tierce"},{"id":"f170","domain":"Security Operations","category":"Composant","front":"OAuth 2.0","back":"Framework d'autorisation (pas d'authentification)\nDélègue l'accès sans partager credentials\nEx : 'Connect with Facebook'"},{"id":"f171","domain":"Security Operations","category":"Composant","front":"OpenID Connect (OIDC)","back":"Couche d'authentification par-dessus OAuth 2.0\nFournit identité utilisateur via ID Token (JWT)"},{"id":"f172","domain":"Security Operations","category":"Composant","front":"Kerberos","back":"Protocole d'authentification réseau (port 88)\nUtilise tickets + KDC (Key Distribution Center)\nPar défaut dans Active Directory"},{"id":"f173","domain":"Security Operations","category":"Composant","front":"RADIUS","back":"Remote Authentication Dial-In User Service\nPort 1812 (auth) | 1813 (accounting)\nChiffre seulement le mot de passe"},{"id":"f174","domain":"Security Operations","category":"Composant","front":"TACACS+","back":"Terminal Access Controller Access-Control System Plus\nChiffre TOUT le paquet (vs RADIUS)\nUtilisé pour authentification équipements réseau (Cisco)"},{"id":"f175","domain":"Security Operations","category":"Composant","front":"PAP vs CHAP","back":"PAP : Password Authentication Protocol – envoie password en clair\nCHAP : Challenge Handshake AP – hash challenge/response, plus sécurisé"},{"id":"f176","domain":"Security Operations","category":"Composant","front":"802.1X","back":"Standard d'authentification réseau basé sur port\nRequiert : Supplicant, Authenticator, Auth Server (RADIUS)\nEx : authentification WiFi entreprise (WPA Enterprise)"},{"id":"f177","domain":"Security Operations","category":"Composant","front":"SIEM (Security Information & Event Management)","back":"Collecte, corrèle et analyse les logs de tout le réseau\nFournit alertes en temps réel + forensic\nEx : Splunk, IBM QRadar, Microsoft Sentinel"},{"id":"f178","domain":"Security Operations","category":"Composant","front":"SOAR (Security Orchestration, Automation & Response)","back":"Automatise la réponse aux incidents via playbooks\nRéduit le temps de réponse (MTTR)\nIntègre avec SIEM, threat intel, ticketing"},{"id":"f179","domain":"Security Operations","category":"Composant","front":"EDR (Endpoint Detection & Response)","back":"Agent sur endpoint : détecte, analyse, répond aux menaces\nVision comportementale (vs AV signature-based)\nEx : CrowdStrike, Carbon Black"},{"id":"f180","domain":"Security Operations","category":"Composant","front":"XDR (Extended Detection & Response)","back":"EDR étendu : corrèle données endpoint + réseau + cloud\nVision unifiée de toute la surface d'attaque"},{"id":"f181","domain":"Security Operations","category":"Composant","front":"Vulnerability Scanner","back":"Identifie les vulnérabilités sans les exploiter\nActif (avec credentials) vs Passif (observation réseau)\nEx : Nessus, OpenVAS, Qualys"},{"id":"f182","domain":"Security Operations","category":"Composant","front":"Nmap","back":"Outil de scan réseau (ports, services, OS)\nDécouverte de hosts et fingerprinting\nCommande : nmap -sV -O <target>"},{"id":"f183","domain":"Security Operations","category":"Composant","front":"Wireshark / Packet Capture","back":"Outil d'analyse de trafic réseau (packet sniffer)\nCapture et analyse des paquets en temps réel\nUtilise des filtres BPF"},{"id":"f184","domain":"Security Operations","category":"Composant","front":"netstat","back":"Affiche connexions réseau actives, ports en écoute, tables de routage\nnetstat -an : toutes connexions\nnetstat -tuln : ports en écoute"},{"id":"f185","domain":"Security Operations","category":"Composant","front":"Honeypot (opérationnel)","back":"Système leurre pour attirer et étudier les attaquants\nObjectif : comprendre TTPs, collecter indicateurs"},{"id":"f186","domain":"Security Operations","category":"Concept","front":"Pentest – phases","back":"1. Reconnaissance\n2. Scanning/Enumeration\n3. Exploitation\n4. Post-exploitation / Lateral movement\n5. Reporting"},{"id":"f187","domain":"Security Operations","category":"Concept","front":"Black Box vs White Box vs Grey Box","back":"Black : attaquant sans aucune info (réaliste)\nWhite : accès complet docs/code (exhaustif)\nGrey : info partielle (équilibre)"},{"id":"f188","domain":"Security Operations","category":"Concept","front":"Active vs Passive Reconnaissance","back":"Active : interaction directe avec la cible (scan, requêtes)\nPassive : OSINT sans contact direct (WHOIS, Google, Shodan)"},{"id":"f189","domain":"Security Operations","category":"Concept","front":"OSINT (Open Source Intelligence)","back":"Collecte d'informations depuis sources publiques\nEx : LinkedIn, WHOIS, Shodan, Google dorking, Pastebin"},{"id":"f190","domain":"Security Operations","category":"Concept","front":"IR – Phases (NIST)","back":"1. Preparation\n2. Detection & Analysis\n3. Containment\n4. Eradication\n5. Recovery\n6. Post-incident Activity (Lessons Learned)"},{"id":"f191","domain":"Security Operations","category":"Concept","front":"Chain of Custody","back":"Documentation traçant la possession des preuves numériques\nCritique pour admissibilité en justice\nInclut : qui, quoi, quand, où, comment"},{"id":"f192","domain":"Security Operations","category":"Concept","front":"Order of Volatility (Forensics)","back":"Collecter preuves du plus volatile au moins volatile\n1. RAM → 2. Réseau/Cache → 3. Processus → 4. Disque → 5. Archives"},{"id":"f193","domain":"Security Operations","category":"Concept","front":"Tabletop Exercise","back":"Simulation discussion des procédures IR sans action réelle\nIdentifie les lacunes dans les plans de réponse"},{"id":"f194","domain":"Security Operations","category":"Concept","front":"Playbook vs Runbook","back":"Playbook : guide stratégique des procédures IR (haut niveau)\nRunbook : instructions opérationnelles détaillées étape par étape"},{"id":"f195","domain":"Security Operations","category":"Composant","front":"Syslog","back":"Protocole standard de transmission de logs (port 514 UDP)\nSeverity : 0 Emergency → 7 Debug\nSyslog-ng et rsyslog = implémentations communes"},{"id":"f196","domain":"Security Operations","category":"Composant","front":"NetFlow","back":"Protocole Cisco de monitoring des flux réseau\nQui parle à qui, combien de données, quelle durée\nUtilisé pour détecter comportements anormaux"},{"id":"f197","domain":"Security Operations","category":"Concept","front":"Log agrégation / Normalisation","back":"Centraliser logs de sources multiples\nNormaliser : convertir dans un format commun pour corrélation SIEM"},{"id":"f198","domain":"Security Operations","category":"Composant","front":"Spam filter / Anti-spam","back":"Filtre les emails non sollicités\nTechniques : bayésien, reputation IP, blacklists (RBL)"},{"id":"f199","domain":"Security Operations","category":"Composant","front":"Secure Email Gateway","back":"Filtre emails entrants et sortants (malware, spam, DLP)\nInspecte avant livraison"},{"id":"f200","domain":"Security Operations","category":"Composant","front":"Full Disk Encryption (FDE)","back":"BitLocker (Windows) | FileVault (macOS)\nChiffre tout le disque → protège contre vol physique\nRequiert TPM ou USB key pour démarrage"},{"id":"f201","domain":"Security Operations","category":"Composant","front":"MDM (Mobile Device Management)","back":"Gestion centralisée des appareils mobiles\nFonctions : remote wipe, enforce policies, app management"},{"id":"f202","domain":"Security Operations","category":"Concept","front":"BYOD vs COPE vs CYOD","back":"BYOD : l'employé apporte son device perso\nCOPE : device entreprise, usage perso autorisé\nCYOD : l'employé choisit parmi options entreprise"},{"id":"f203","domain":"Security Operations","category":"Concept","front":"Sandboxing","back":"Exécuter code dans environnement isolé\nLimite les dommages si code malveillant\nEx : navigateurs, analyse de malware"},{"id":"f204","domain":"Program Management","category":"Concept","front":"GRC (Governance, Risk, Compliance)","back":"Gouvernance : politiques et processus de décision\nRisk : identification et traitement des risques\nCompliance : respect des lois et régulations"},{"id":"f205","domain":"Program Management","category":"Framework/Standard","front":"NIST Cybersecurity Framework (CSF)","back":"5 fonctions : Identify · Protect · Detect · Respond · Recover\nFramework volontaire, basé sur meilleures pratiques"},{"id":"f206","domain":"Program Management","category":"Framework/Standard","front":"ISO 27001","back":"Standard international de management de la sécurité de l'information\nCertifiable par audit externe"},{"id":"f207","domain":"Program Management","category":"Framework/Standard","front":"SOC 2","back":"Standard d'audit pour providers de services (SaaS)\nBasé sur 5 Trust Service Criteria : Security, Availability, Confidentiality, Integrity, Privacy"},{"id":"f208","domain":"Program Management","category":"Framework/Standard","front":"CIS Controls","back":"18 contrôles de sécurité prioritaires par le Center for Internet Security\nPriorisés par impact sur réduction de risque"},{"id":"f209","domain":"Program Management","category":"Framework/Standard","front":"MITRE ATT&CK","back":"Base de connaissances des TTPs (Tactics, Techniques, Procedures) des attaquants\nUtilisé pour threat modeling et détection"},{"id":"f210","domain":"Program Management","category":"Framework/Standard","front":"GDPR (Règlement Général sur la Protection des Données)","back":"Régulation EU sur la protection des données personnelles\nBreaches → notifier DPA dans 72 heures\nDroit à l'oubli, portabilité"},{"id":"f211","domain":"Program Management","category":"Framework/Standard","front":"HIPAA","back":"Health Insurance Portability and Accountability Act\nProtège les PHI (Protected Health Information) aux USA\nRequiert contrôles admin, physiques, techniques"},{"id":"f212","domain":"Program Management","category":"Framework/Standard","front":"PCI DSS","back":"Payment Card Industry Data Security Standard\nProtège les données de cartes bancaires\n12 exigences : réseau sécurisé, protect cardholder data, test régulier..."},{"id":"f213","domain":"Program Management","category":"Framework/Standard","front":"FISMA","back":"Federal Information Security Management Act\nObligation de sécurité pour les agences fédérales USA\nBasé sur NIST SP 800-53"},{"id":"f214","domain":"Program Management","category":"Framework/Standard","front":"SOX (Sarbanes-Oxley)","back":"Loi USA sur la gouvernance financière des entreprises cotées\nRequiert contrôles sur l'intégrité des systèmes financiers"},{"id":"f215","domain":"Program Management","category":"Concept","front":"Risk = Threat × Vulnerability × Impact","back":"Probabilité qu'une menace exploite une vulnérabilité\nImpact = conséquences si l'événement se produit"},{"id":"f216","domain":"Program Management","category":"Concept","front":"Risk treatment – 4 stratégies","back":"Accept : risque tolérable, aucune action\nTransfer : assurance, sous-traitance\nAvoid : arrêter l'activité risquée\nMitigate : réduire la probabilité ou l'impact"},{"id":"f217","domain":"Program Management","category":"Concept","front":"Qualitative vs Quantitative Risk Analysis","back":"Qualitative : évaluation subjective (High/Med/Low)\nQuantitative : valeurs numériques (ALE = SLE × ARO)"},{"id":"f218","domain":"Program Management","category":"Concept","front":"SLE / ALE / ARO","back":"SLE (Single Loss Expectancy) : perte financière par incident\nARO (Annual Rate of Occurrence) : fréquence annuelle\nALE (Annual Loss Expectancy) = SLE × ARO"},{"id":"f219","domain":"Program Management","category":"Concept","front":"BIA (Business Impact Analysis)","back":"Identifie les processus critiques et leur impact si interrompus\nDétermine : RTO, RPO, MTD (Max Tolerable Downtime)"},{"id":"f220","domain":"Program Management","category":"Concept","front":"AUP (Acceptable Use Policy)","back":"Définit l'utilisation acceptable des ressources IT\nSignée par les employés lors de l'embauche"},{"id":"f221","domain":"Program Management","category":"Concept","front":"Clean Desk Policy","back":"Aucun document sensible laissé visible à l'écran ou sur le bureau\nPrévention de l'espionnage visuel (shoulder surfing)"},{"id":"f222","domain":"Program Management","category":"Concept","front":"Data Retention Policy","back":"Durée pendant laquelle les données doivent être conservées\nBasée sur obligations légales et besoins métier"},{"id":"f223","domain":"Program Management","category":"Concept","front":"Vendor / Third-party Risk Management","back":"Évaluer la posture sécurité des fournisseurs\nSLA, questionnaires, audits, right-to-audit clauses"},{"id":"f224","domain":"Program Management","category":"Concept","front":"Due Diligence vs Due Care","back":"Due Diligence : recherche et évaluation des risques AVANT\nDue Care : application raisonnable des contrôles APRÈS identification"},{"id":"f225","domain":"Program Management","category":"Concept","front":"Data Owner vs Data Custodian","back":"Data Owner : responsable business des données (décide politiques)\nData Custodian : responsable technique (implémente sécurité)"},{"id":"f226","domain":"Program Management","category":"Concept","front":"PII vs PHI vs PCI","back":"PII : Personally Identifiable Information (nom, email, SSN)\nPHI : Protected Health Information (données médicales)\nPCI : Payment Card Information (numéros de carte)"},{"id":"f227","domain":"General Security Concepts","category":"Concept","front":"Defense in Depth","back":"Couches multiples de sécurité\nSi une couche est compromise, les suivantes protègent encore"},{"id":"f228","domain":"General Security Concepts","category":"Concept","front":"Security by Design","back":"Intégrer la sécurité dès la conception, pas en ajout final\nPrincipe : security by default, fail securely"},{"id":"f229","domain":"Threats & Vulnerabilities","category":"Attaque","front":"Drive-by Download","back":"Malware téléchargé automatiquement lors de visite d'un site web\nSans interaction utilisateur\nExploite vulnérabilités browser/plugins"},{"id":"f230","domain":"Security Operations","category":"Composant","front":"PAM (Privileged Access Management)","back":"Contrôle et audit des comptes à privilèges élevés\nJust-in-Time access, session recording\nEx : CyberArk, BeyondTrust"},{"id":"f231","domain":"Security Architecture","category":"Concept","front":"Microsegmentation","back":"Segmentation très granulaire jusqu'au workload individuel\nLimite le mouvement latéral dans le datacenter/cloud\nImplémenté via SDN ou firewalls logiciels"},{"id":"f232","domain":"Security Operations","category":"Concept","front":"Threat Intelligence","back":"Informations sur les menaces actuelles et acteurs malveillants\nFeeds : STIX/TAXII format\nEx : VirusTotal, AlienVault OTX, MISP"},{"id":"f233","domain":"Security Architecture","category":"Composant","front":"ZTNA (Zero Trust Network Access)","back":"Remplace VPN traditionnel\nAccès granulaire basé sur identité + contexte\nPas d'accès réseau complet → accès application par application"},{"id":"f234","domain":"Security Operations","category":"Concept","front":"Security Awareness Training","back":"Former les utilisateurs aux bonnes pratiques\nContenu : phishing, password hygiene, social engineering\nSimulations de phishing pour mesurer efficacité"},{"id":"f235","domain":"Program Management","category":"Concept","front":"Penetration Testing vs Vulnerability Assessment","back":"Vuln Assessment : identifie les failles (pas d'exploitation)\nPentest : exploite les failles pour prouver l'impact\nPentest requiert autorisation explicite écrite"}];

const DOMAINS = [
  "All",
  "General Security Concepts",
  "Threats & Vulnerabilities",
  "Security Architecture",
  "Security Operations",
  "Program Management",
];

const CATEGORIES = [
  "All",
  "Attaque","Malware","Cryptographie","Protocole/Port",
  "Composant","Concept","Framework/Standard",
];

const DOMAIN_COLOR = {
  "General Security Concepts":  { bg:"#0d2137", border:"#1d4ed8", accent:"#3b82f6", label:"GEN" },
  "Threats & Vulnerabilities":  { bg:"#1f0f0f", border:"#dc2626", accent:"#f87171", label:"THR" },
  "Security Architecture":      { bg:"#150d2a", border:"#7c3aed", accent:"#a78bfa", label:"ARC" },
  "Security Operations":        { bg:"#0f1e14", border:"#16a34a", accent:"#4ade80", label:"OPS" },
  "Program Management":         { bg:"#1a1508", border:"#ca8a04", accent:"#facc15", label:"PRG" },
};

const CAT_ICON = {
  "Attaque":"⚔️","Malware":"🦠","Cryptographie":"🔐",
  "Protocole/Port":"🌐","Composant":"⚙️","Concept":"💡",
  "Framework/Standard":"📋",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadProgress() {
  try { return JSON.parse(localStorage.getItem("fc_progress") || "{}"); } catch { return {}; }
}
function saveProgress(p) {
  try { localStorage.setItem("fc_progress", JSON.stringify(p)); } catch {}
}

// ─── Flip Card ─────────────────────────────────────────────────────────────
function FlipCard({ card, onKnow, onStudy, showBack, onFlip }) {
  const col = DOMAIN_COLOR[card.domain] || DOMAIN_COLOR["General Security Concepts"];

  return (
    <div style={{ perspective: "1000px", width: "100%", maxWidth: 680, cursor: "pointer" }}
      onClick={onFlip}>
      <div style={{
        position: "relative",
        height: 320,
        transition: "transform 0.45s cubic-bezier(.4,0,.2,1)",
        transformStyle: "preserve-3d",
        transform: showBack ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* FRONT */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          background: `linear-gradient(145deg, ${col.bg} 0%, #0a0f1e 100%)`,
          border: `2px solid ${col.border}`,
          borderRadius: 20,
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          padding: "28px 32px",
          boxShadow: `0 0 40px ${col.border}22`,
        }}>
          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <span style={{ fontSize:13, fontWeight:800, letterSpacing:"0.12em",
                color: col.accent, textTransform:"uppercase" }}>
                {col.label}
              </span>
              <span style={{ fontSize:13, color:"#475569" }}>·</span>
              <span style={{ fontSize:13, color:"#64748b" }}>{CAT_ICON[card.category]} {card.category}</span>
            </div>
            <span style={{ fontSize:12, color:"#334155", fontStyle:"italic" }}>cliquer pour révéler</span>
          </div>

          {/* Question */}
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px 0" }}>
            <h2 style={{
              fontSize: card.front.length > 60 ? 18 : card.front.length > 40 ? 20 : 22,
              fontWeight: 700,
              color: "#f1f5f9",
              textAlign: "center",
              lineHeight: 1.5,
              fontFamily: "'Georgia', serif",
              margin: 0,
            }}>
              {card.front}
            </h2>
          </div>

          {/* Footer */}
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
            <div style={{
              width:40, height:4, borderRadius:2,
              background:`linear-gradient(90deg, ${col.border}, ${col.accent})`,
            }}/>
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: `linear-gradient(145deg, #0a0f1e 0%, ${col.bg} 100%)`,
          border: `2px solid ${col.border}`,
          borderRadius: 20,
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px 32px",
          boxShadow: `0 0 40px ${col.border}33`,
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:12, color:"#475569" }}>Réponse</span>
            <span style={{ fontSize:13, fontWeight:800, color: col.accent, letterSpacing:"0.12em", textTransform:"uppercase" }}>
              {col.label} · {card.category}
            </span>
          </div>

          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px 0" }}>
            <p style={{
              fontSize: 16,
              color: "#e2e8f0",
              lineHeight: 1.8,
              textAlign: "center",
              whiteSpace: "pre-line",
              margin: 0,
            }}>
              {card.back}
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display:"flex", gap:12 }} onClick={e => e.stopPropagation()}>
            <button onClick={onStudy} style={{
              flex:1, padding:"12px", borderRadius:12, border:"2px solid #dc2626",
              background:"#2d0a0a", color:"#f87171", fontWeight:800, fontSize:14,
              cursor:"pointer", letterSpacing:"0.05em",
            }}>
              ✗ À revoir
            </button>
            <button onClick={onKnow} style={{
              flex:1, padding:"12px", borderRadius:12, border:"2px solid #16a34a",
              background:"#052e16", color:"#4ade80", fontWeight:800, fontSize:14,
              cursor:"pointer", letterSpacing:"0.05em",
            }}>
              ✓ Je sais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Browse Mode ────────────────────────────────────────────────────────────
function BrowseMode({ cards, progress }) {
  const [domFilter, setDomFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");
  const [searchQ, setSearchQ] = useState("");

  const filtered = cards.filter(c => {
    if (domFilter !== "All" && c.domain !== domFilter) return false;
    if (catFilter !== "All" && c.category !== catFilter) return false;
    if (searchQ && !c.front.toLowerCase().includes(searchQ.toLowerCase()) && 
        !c.back.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      {/* Filters */}
      <div style={{ marginBottom:20 }}>
        <input
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          placeholder="🔍 Rechercher une flashcard..."
          style={{
            width:"100%", padding:"12px 16px", borderRadius:10,
            background:"#0f172a", border:"1px solid #1e293b",
            color:"#e2e8f0", fontSize:14, marginBottom:12,
            outline:"none",
          }}
        />
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:8 }}>
          {DOMAINS.slice(1).map(d => {
            const col = DOMAIN_COLOR[d];
            const active = domFilter === d;
            return (
              <button key={d} onClick={() => setDomFilter(active ? "All" : d)} style={{
                padding:"5px 12px", borderRadius:999, border:`1px solid ${active ? col.border : "#1e293b"}`,
                background: active ? col.bg : "transparent",
                color: active ? col.accent : "#475569",
                fontSize:12, fontWeight:700, cursor:"pointer",
              }}>
                {col.label} {d.split(" ")[0]}
              </button>
            );
          })}
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {CATEGORIES.slice(1).map(c => {
            const active = catFilter === c;
            return (
              <button key={c} onClick={() => setCatFilter(active ? "All" : c)} style={{
                padding:"4px 10px", borderRadius:999, border:`1px solid ${active ? "#475569" : "#1e293b"}`,
                background: active ? "#1e293b" : "transparent",
                color: active ? "#e2e8f0" : "#475569",
                fontSize:11, cursor:"pointer",
              }}>
                {CAT_ICON[c]} {c}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ color:"#475569", fontSize:12, marginBottom:12 }}>
        {filtered.length} flashcards affichées
      </div>

      {/* Card list */}
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {filtered.map(card => {
          const col = DOMAIN_COLOR[card.domain] || DOMAIN_COLOR["General Security Concepts"];
          const isOpen = expanded === card.id;
          const known = progress[card.id] === "know";
          const study = progress[card.id] === "study";
          return (
            <div key={card.id}
              onClick={() => setExpanded(isOpen ? null : card.id)}
              style={{
                background: isOpen ? `${col.bg}cc` : "#0a0f1e",
                border: `1px solid ${isOpen ? col.border : "#1e293b"}`,
                borderRadius: 12, padding:"14px 18px", cursor:"pointer",
                transition:"all 0.2s",
              }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  {known && <span style={{ fontSize:14, color:"#4ade80" }}>✓</span>}
                  {study && <span style={{ fontSize:14, color:"#f87171" }}>✗</span>}
                  <span style={{ fontSize:14, color:"#e2e8f0", fontWeight:600 }}>{card.front}</span>
                </div>
                <span style={{ fontSize:11, color: col.accent, fontWeight:700, flexShrink:0, marginLeft:12 }}>
                  {col.label} · {card.category}
                </span>
              </div>
              {isOpen && (
                <div style={{
                  marginTop:12, paddingTop:12,
                  borderTop:`1px solid ${col.border}44`,
                  color:"#94a3b8", fontSize:14, lineHeight:1.7,
                  whiteSpace:"pre-line",
                }}>
                  {card.back}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Stats Panel ────────────────────────────────────────────────────────────
function StatsPanel({ progress, total }) {
  const known = Object.values(progress).filter(v => v === "know").length;
  const study = Object.values(progress).filter(v => v === "study").length;
  const unseen = total - known - study;
  const pct = Math.round((known / total) * 100);

  const byDomain = {};
  ALL_CARDS.forEach(c => {
    if (!byDomain[c.domain]) byDomain[c.domain] = { known:0, study:0, total:0 };
    byDomain[c.domain].total++;
    if (progress[c.id] === "know") byDomain[c.domain].known++;
    if (progress[c.id] === "study") byDomain[c.domain].study++;
  });

  return (
    <div>
      {/* Global */}
      <div style={{
        background:"#0a0f1e", border:"1px solid #1e293b",
        borderRadius:16, padding:"24px 28px", marginBottom:16,
      }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:20 }}>
          {[
            { label:"Maîtrisés", val:known, color:"#4ade80" },
            { label:"À revoir", val:study, color:"#f87171" },
            { label:"Non vus", val:unseen, color:"#475569" },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ textAlign:"center" }}>
              <div style={{ fontSize:36, fontWeight:900, color, fontFamily:"monospace" }}>{val}</div>
              <div style={{ fontSize:11, color:"#475569", textTransform:"uppercase", fontWeight:700, letterSpacing:"0.06em" }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom:8 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ fontSize:12, color:"#475569" }}>Progression globale</span>
            <span style={{ fontSize:12, color:"#4ade80", fontWeight:700 }}>{pct}%</span>
          </div>
          <div style={{ height:8, background:"#1e293b", borderRadius:4 }}>
            <div style={{
              height:"100%", width:`${pct}%`,
              background:"linear-gradient(90deg, #16a34a, #4ade80)",
              borderRadius:4, transition:"width 0.6s ease",
            }}/>
          </div>
        </div>
      </div>

      {/* By domain */}
      <div style={{
        background:"#0a0f1e", border:"1px solid #1e293b",
        borderRadius:16, padding:"24px 28px",
      }}>
        <h3 style={{ color:"#475569", fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:16 }}>
          Par domaine
        </h3>
        {Object.entries(byDomain).map(([domain, { known: k, total: t }]) => {
          const col = DOMAIN_COLOR[domain] || DOMAIN_COLOR["General Security Concepts"];
          const p = Math.round((k/t)*100);
          return (
            <div key={domain} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:12, color: col.accent, fontWeight:700 }}>{col.label} {domain}</span>
                <span style={{ fontSize:12, color:"#94a3b8" }}>{k}/{t}</span>
              </div>
              <div style={{ height:5, background:"#1e293b", borderRadius:3 }}>
                <div style={{
                  height:"100%", width:`${p}%`,
                  background: col.accent, borderRadius:3,
                }}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("study");
  const [progress, setProgress] = useState(loadProgress);
  const [domainFilter, setDomainFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");
  const [studyMode, setStudyMode] = useState("all"); // all | study_only | unseen
  
  // Filtered deck
  const deck = (() => {
    let cards = ALL_CARDS;
    if (domainFilter !== "All") cards = cards.filter(c => c.domain === domainFilter);
    if (catFilter !== "All") cards = cards.filter(c => c.category === catFilter);
    if (studyMode === "study_only") cards = cards.filter(c => progress[c.id] === "study");
    if (studyMode === "unseen") cards = cards.filter(c => !progress[c.id]);
    return cards;
  })();

  const [shuffled, setShuffled] = useState(() => shuffle(deck));
  const [idx, setIdx] = useState(0);
  const [showBack, setShowBack] = useState(false);

  // Reshuffle when filters change
  useEffect(() => {
    setShuffled(shuffle(deck));
    setIdx(0);
    setShowBack(false);
  }, [domainFilter, catFilter, studyMode]);

  const current = shuffled[idx] || null;

  const handleMark = useCallback((verdict) => {
    if (!current) return;
    const newP = { ...progress, [current.id]: verdict };
    setProgress(newP);
    saveProgress(newP);
    setShowBack(false);
    setTimeout(() => {
      if (idx < shuffled.length - 1) {
        setIdx(i => i + 1);
      } else {
        // Reshuffle and restart
        setShuffled(shuffle(deck));
        setIdx(0);
      }
    }, 180);
  }, [current, progress, idx, shuffled, deck]);

  const handleNext = useCallback(() => {
    setShowBack(false);
    setTimeout(() => {
      if (idx < shuffled.length - 1) setIdx(i => i + 1);
      else { setShuffled(shuffle(deck)); setIdx(0); }
    }, 150);
  }, [idx, shuffled, deck]);

  const handlePrev = useCallback(() => {
    if (idx > 0) { setShowBack(false); setTimeout(() => setIdx(i => i - 1), 150); }
  }, [idx]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (tab !== "study") return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); setShowBack(v => !v); }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "1" && showBack) handleMark("study");
      if (e.key === "2" && showBack) handleMark("know");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [tab, showBack, handleNext, handlePrev, handleMark]);

  const tabStyle = (t) => ({
    padding:"10px 20px", borderRadius:8, border:"none", cursor:"pointer",
    fontSize:13, fontWeight:700, letterSpacing:"0.05em", textTransform:"uppercase",
    background: tab === t ? "#1e293b" : "transparent",
    color: tab === t ? "#f1f5f9" : "#475569",
    borderBottom: tab === t ? "2px solid #3b82f6" : "2px solid transparent",
    transition:"all 0.2s",
  });

  const known = Object.values(progress).filter(v => v === "know").length;
  const studyCount = Object.values(progress).filter(v => v === "study").length;

  return (
    <div style={{
      minHeight:"100vh",
      background:"#050d1a",
      color:"#e2e8f0",
      fontFamily:"'Segoe UI', system-ui, sans-serif",
    }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#050d1a; }
        ::-webkit-scrollbar-thumb { background:#1e293b; border-radius:3px; }
        button:hover { opacity:0.85; }
        input { box-sizing:border-box; }
        @keyframes slideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* Header */}
      <header style={{
        background:"#050d1a", borderBottom:"1px solid #0f172a",
        padding:"0 20px", position:"sticky", top:0, zIndex:100,
      }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{
                width:36, height:36,
                background:"linear-gradient(135deg, #1d4ed8, #7c3aed)",
                borderRadius:10, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:18, flexShrink:0,
              }}>🛡️</div>
              <div>
                <div style={{ fontSize:15, fontWeight:800, color:"#f1f5f9", letterSpacing:"-0.01em" }}>
                  Security+ Flashcards
                </div>
                <div style={{ fontSize:11, color:"#334155", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase" }}>
                  SY0-701 · {ALL_CARDS.length} cartes · {known} maîtrisées · {studyCount} à revoir
                </div>
              </div>
            </div>
            <div style={{ display:"flex", gap:4 }}>
              {["study","browse","stats"].map(t => (
                <button key={t} style={tabStyle(t)} onClick={() => setTab(t)}>
                  {t === "study" ? "📚 Étude" : t === "browse" ? "🗂 Parcourir" : "📊 Stats"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main style={{ padding:"24px 20px", maxWidth:900, margin:"0 auto" }}>
        
        {/* STUDY TAB */}
        {tab === "study" && (
          <div style={{ animation:"slideIn 0.3s ease" }}>
            {/* Filter Bar */}
            <div style={{
              background:"#0a0f1e", border:"1px solid #1e293b",
              borderRadius:12, padding:"12px 16px", marginBottom:20,
              display:"flex", gap:8, flexWrap:"wrap", alignItems:"center",
            }}>
              {/* Domain filter */}
              <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)} style={{
                background:"#0f172a", border:"1px solid #1e293b", color:"#94a3b8",
                padding:"6px 10px", borderRadius:8, fontSize:12, cursor:"pointer",
              }}>
                <option value="All">🌐 Tous les domaines</option>
                {DOMAINS.slice(1).map(d => (
                  <option key={d} value={d}>{DOMAIN_COLOR[d].label} {d}</option>
                ))}
              </select>

              {/* Category filter */}
              <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{
                background:"#0f172a", border:"1px solid #1e293b", color:"#94a3b8",
                padding:"6px 10px", borderRadius:8, fontSize:12, cursor:"pointer",
              }}>
                <option value="All">📁 Toutes catégories</option>
                {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{CAT_ICON[c]} {c}</option>)}
              </select>

              {/* Study mode */}
              <select value={studyMode} onChange={e => setStudyMode(e.target.value)} style={{
                background:"#0f172a", border:"1px solid #1e293b", color:"#94a3b8",
                padding:"6px 10px", borderRadius:8, fontSize:12, cursor:"pointer",
              }}>
                <option value="all">🔀 Toutes les cartes</option>
                <option value="unseen">👁 Non vues uniquement</option>
                <option value="study_only">✗ À revoir uniquement</option>
              </select>

              <span style={{ fontSize:12, color:"#334155", marginLeft:"auto" }}>
                {shuffled.length} cartes dans le deck
              </span>
            </div>

            {shuffled.length === 0 ? (
              <div style={{ textAlign:"center", padding:"60px 0", color:"#475569" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🎉</div>
                <p style={{ fontSize:18, fontWeight:700 }}>Toutes les cartes sont maîtrisées !</p>
                <p style={{ fontSize:14, marginTop:8 }}>Change le filtre ou réinitialise.</p>
                <button onClick={() => setStudyMode("all")} style={{
                  marginTop:20, padding:"10px 24px", borderRadius:10,
                  background:"#1d4ed8", color:"#fff", border:"none",
                  fontWeight:700, cursor:"pointer", fontSize:14,
                }}>Voir toutes les cartes</button>
              </div>
            ) : (
              <>
                {/* Progress indicator */}
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                  <span style={{ fontSize:13, color:"#475569" }}>
                    Carte {idx + 1} / {shuffled.length}
                  </span>
                  <span style={{ fontSize:12, color:"#334155" }}>
                    ← → naviguer · Espace retourner · 1 = à revoir · 2 = je sais
                  </span>
                </div>

                <div style={{ height:4, background:"#0f172a", borderRadius:2, marginBottom:24 }}>
                  <div style={{
                    height:"100%",
                    width:`${((idx+1)/shuffled.length)*100}%`,
                    background:"linear-gradient(90deg,#1d4ed8,#7c3aed)",
                    borderRadius:2, transition:"width 0.3s ease",
                  }}/>
                </div>

                {/* Card */}
                <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
                  {current && (
                    <FlipCard
                      card={current}
                      showBack={showBack}
                      onFlip={() => setShowBack(v => !v)}
                      onKnow={() => handleMark("know")}
                      onStudy={() => handleMark("study")}
                    />
                  )}
                </div>

                {/* Nav */}
                <div style={{ display:"flex", justifyContent:"center", gap:12 }}>
                  <button onClick={handlePrev} disabled={idx === 0} style={{
                    padding:"10px 20px", borderRadius:10,
                    background:idx===0?"#0f172a":"#1e293b",
                    color:idx===0?"#334155":"#94a3b8",
                    border:"1px solid #1e293b",
                    fontWeight:700, fontSize:14, cursor: idx===0?"not-allowed":"pointer",
                  }}>← Précédente</button>
                  
                  {!showBack ? (
                    <button onClick={() => setShowBack(true)} style={{
                      padding:"10px 24px", borderRadius:10,
                      background:"linear-gradient(135deg,#1d4ed8,#7c3aed)",
                      color:"#fff", border:"none",
                      fontWeight:700, fontSize:14, cursor:"pointer",
                    }}>Retourner la carte</button>
                  ) : (
                    <button onClick={handleNext} style={{
                      padding:"10px 24px", borderRadius:10,
                      background:"#1e293b", color:"#94a3b8",
                      border:"1px solid #1e293b",
                      fontWeight:700, fontSize:14, cursor:"pointer",
                    }}>Suivante sans noter →</button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* BROWSE TAB */}
        {tab === "browse" && (
          <div style={{ animation:"slideIn 0.3s ease" }}>
            <BrowseMode cards={ALL_CARDS} progress={progress} />
          </div>
        )}

        {/* STATS TAB */}
        {tab === "stats" && (
          <div style={{ animation:"slideIn 0.3s ease" }}>
            <StatsPanel progress={progress} total={ALL_CARDS.length} />
            <div style={{ marginTop:16, textAlign:"center" }}>
              <button onClick={() => { const newP = {}; setProgress(newP); saveProgress(newP); }} style={{
                padding:"10px 24px", borderRadius:10,
                background:"#2d0a0a", border:"1px solid #dc2626",
                color:"#f87171", fontWeight:700, fontSize:13, cursor:"pointer",
              }}>
                🗑 Réinitialiser la progression
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}