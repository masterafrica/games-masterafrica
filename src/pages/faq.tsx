import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Answers use "\n" for line breaks and "• " for bullets (rendered with whitespace-pre-line).
const FAQ: { title: string; items: [string, string][] }[] = [
  {
    title: "About Master Africa Games",
    items: [
      [
        "What is Master Africa Games (MAG)?",
        "Master Africa Games (MAG) is a skill-based gaming and opportunity platform where young Africans can play, compete, showcase their skills, earn MAG Points, win rewards, and discover opportunities.",
      ],
      [
        "Who can join MAG?",
        "Anyone who wants to develop, showcase, test, or discover their skills can join MAG, subject to the requirements of specific challenges and opportunities.",
      ],
      [
        "Is MAG only for students?",
        "No. MAG is open to students, graduates, young professionals, creators, entrepreneurs, skilled workers, and anyone interested in skill-based opportunities.",
      ],
      [
        "Do I need to be highly skilled to join?",
        "No. MAG is designed to help you discover, develop and prove your skills. Some challenges are beginner-friendly, while others may require specific skills.",
      ],
      [
        "What does “Your Skill Will Make Room For You” mean?",
        "It means your skills can create opportunities for you when you are able to demonstrate what you can do.",
      ],
    ],
  },
  {
    title: "MAG Account",
    items: [
      [
        "How do I create a MAG account?",
        "Visit the official MAG platform, create your account, and complete the required registration information.",
      ],
      ["Is creating a MAG account free?", "Yes. Your MAG account is free to create."],
      [
        "Why do I need a MAG account?",
        "Your MAG account allows you to participate in MAG activities, track your MAG Points, access challenges, appear on leaderboards, and build your skill profile.",
      ],
      [
        "Can I have more than one MAG account?",
        "No. Players should maintain one genuine MAG account.",
      ],
      [
        "What should I do if I forget my password?",
        "Use the password recovery option on the MAG platform. If you are still unable to access your account, contact MAG support.",
      ],
      [
        "Can I change my account information?",
        "Where the platform allows it, you can update your information from your profile. For information that cannot be changed directly, contact MAG support.",
      ],
    ],
  },
  {
    title: "MAG Tickets",
    items: [
      [
        "What is a MAG Ticket?",
        "A MAG Ticket gives a player access to designated MAG challenges and activities that require a ticket.",
      ],
      [
        "How much is a MAG Ticket?",
        "The current MAG Ticket price is ₦500, unless MAG announces a different price.",
      ],
      [
        "Do I need a MAG Ticket to create a MAG account?",
        "No. Creating a MAG account is free.",
      ],
      [
        "Do I need a MAG Ticket to participate in every MAG activity?",
        "Not necessarily. Some MAG activities may be free, while specific challenges or experiences may require a MAG Ticket.",
      ],
      [
        "Can I transfer my MAG Ticket to someone else?",
        "Unless MAG specifically announces a transferable ticket, tickets should be treated as belonging to the player who purchased them.",
      ],
    ],
  },
  {
    title: "MAG Points",
    items: [
      [
        "What are MAG Points?",
        "MAG Points are your skill and participation points within the MAG ecosystem.\n\nThey help demonstrate your activity, participation, achievements and progression on MAG.",
      ],
      [
        "How do I earn MAG Points?",
        "You can earn MAG Points through eligible MAG activities such as:\n• Participating in challenges\n• Completing designated tasks\n• Referring new players\n• Winning competitions\n• Achieving leaderboard positions\n• Completing other activities announced by MAG",
      ],
      [
        "How many MAG Points do I get for referring someone?",
        "When a referral activity is active, MAG will announce the number of points available. For example, an eligible challenge may award 300 MAG Points for inviting three friends who successfully create MAG accounts.",
      ],
      [
        "Can I buy MAG Points?",
        "MAG Points should be earned through eligible MAG activities unless MAG specifically introduces a promotional mechanism that says otherwise.",
      ],
      [
        "Can I transfer my MAG Points to another player?",
        "No. MAG Points are attached to your MAG account and are not transferable unless MAG introduces such a feature.",
      ],
      [
        "Can MAG Points expire?",
        "MAG will announce if a particular type of MAG Point or promotional point has an expiry period.",
      ],
      [
        "Can MAG remove MAG Points?",
        "Yes. MAG may remove points that were awarded through fraudulent, duplicated, manipulated or otherwise invalid activity.",
      ],
      [
        "Why did I not receive my MAG Points?",
        "First, check whether you completed all requirements of the activity. If you believe you qualified but did not receive your points, contact MAG support with evidence of your participation.",
      ],
    ],
  },
  {
    title: "Referrals",
    items: [
      [
        "What is a MAG referral?",
        "A referral is when you invite another person to join MAG using your eligible referral process or referral code.",
      ],
      [
        "How do I refer someone?",
        "Use your MAG referral link or code and send it to someone who you believe would benefit from joining MAG.",
      ],
      [
        "What does the person I refer need to do?",
        "They must complete the requirements specified by the particular referral campaign.",
      ],
      [
        "Do I earn points for every person I invite?",
        "Not automatically. The person must meet the requirements of the active referral campaign.",
      ],
      [
        "Can I refer myself using another account?",
        "No. Self-referrals, duplicate accounts and artificial referrals are not allowed.",
      ],
      [
        "Can I create multiple accounts to earn referral points?",
        "No. Creating fake or duplicate accounts to manipulate referrals can result in the removal of points or other account restrictions.",
      ],
      [
        "Can I refer people who are already MAG players?",
        "Referral rewards generally apply to new eligible MAG players, according to the rules of the active campaign.",
      ],
    ],
  },
  {
    title: "MAG Challenges",
    items: [
      [
        "What is a MAG Challenge?",
        "A MAG Challenge is a competition or task designed to give players an opportunity to demonstrate a specific skill.",
      ],
      [
        "What types of challenges can MAG have?",
        "Challenges can include:\n• Creative challenges\n• Tech challenges\n• Business challenges\n• Photography challenges\n• Writing challenges\n• Sketching challenges\n• Singing challenges\n• Fix-it challenges\n• Problem-solving challenges\n• Event-planning challenges\n• Team challenges\n• And many more",
      ],
      [
        "Where can I find MAG Challenges?",
        "Check the MAG Web App, official MAG communication channels and the designated MAG community channels for active challenges.",
      ],
      [
        "How do I join a challenge?",
        "Read the challenge requirements, make sure you qualify, complete the challenge and submit your entry according to the instructions.",
      ],
      [
        "Do all challenges have the same rules?",
        "No. Every challenge may have different requirements, deadlines, judging criteria, entry formats and rewards.\n\nAlways read the specific challenge instructions before submitting.",
      ],
    ],
  },
  {
    title: "Submitting a Challenge",
    items: [
      [
        "How do I submit a challenge entry?",
        "Follow the submission instructions provided on the active challenge page.\n\nIf the challenge requires an external submission, upload your work to the specified third-party platform and submit the link through the MAG submission system.",
      ],
      [
        "Can I upload my video directly to MAG?",
        "MAG Web App submissions are designed around links rather than direct media uploads. Upload your work to the required platform and submit the link.",
      ],
      [
        "What platforms can I use to host my entry?",
        "Use the platform specified in the challenge instructions. If no specific platform is required, follow the current MAG submission instructions.",
      ],
      [
        "Can I submit more than once?",
        "Only submit multiple entries if the challenge rules specifically allow it.",
      ],
      [
        "Can I edit my submission after submitting?",
        "This depends on the particular challenge. Check the challenge rules before submitting.",
      ],
      [
        "What happens if my submission link doesn’t work?",
        "Your entry may not be properly reviewed if judges cannot access it. Always test your link before submitting.",
      ],
      [
        "What should I do before submitting?",
        "Check:\n• Your link works\n• Your work is accessible\n• You followed the challenge instructions\n• Your submission meets the deadline\n• You submitted the correct link\n• Your MAG account information is correct",
      ],
    ],
  },
  {
    title: "MAG Point Requirement for Challenges",
    items: [
      [
        "What is the minimum MAG Points requirement?",
        "Some MAG Challenges require players to have a minimum number of MAG Points before they can submit an entry.",
      ],
      [
        "How many MAG Points do I currently need?",
        "Where applicable, the current requirement is displayed on the relevant challenge page.\n\nFor challenges using the current requirement, players need at least 1,000 MAG Points to submit an entry.",
      ],
      [
        "What happens if I have less than 1,000 MAG Points?",
        "You may be unable to submit that challenge entry until you reach the required MAG Points.",
      ],
      [
        "How can I reach 1,000 MAG Points?",
        "Participate in eligible MAG activities, challenges, referrals and other activities that award MAG Points.",
      ],
    ],
  },
  {
    title: "MAG Teams",
    items: [
      [
        "What is a MAG Team?",
        "A MAG Team is a group of MAG players who come together to participate in an eligible team challenge.",
      ],
      [
        "How do I create a MAG Team?",
        "Follow the team-creation instructions provided for the specific challenge.",
      ],
      [
        "How many people can be on a MAG Team?",
        "The required team size depends on the challenge.",
      ],
      [
        "Can I choose my teammates?",
        "For challenges that allow players to choose teammates, yes. Follow the specific challenge rules.",
      ],
      [
        "Can I participate in more than one team?",
        "Only if the specific challenge rules allow it.",
      ],
      [
        "What happens if my teammate doesn’t complete their part?",
        "Your team is responsible for ensuring that all required members complete their responsibilities before the deadline.",
      ],
    ],
  },
  {
    title: "Voting",
    items: [
      [
        "How does MAG voting work?",
        "For challenges that use community voting, MAG may select qualifying entries and allow the MAG community to vote for the winner.",
      ],
      [
        "Where does voting take place?",
        "When voting is enabled, voting takes place through the designated MAG platform or voting page.",
      ],
      [
        "Can I vote for myself?",
        "Follow the rules of the specific challenge. If self-voting is prohibited, players must not vote for their own entry.",
      ],
      [
        "Can I vote multiple times?",
        "Only if the challenge’s voting rules specifically allow multiple votes.",
      ],
      [
        "Can I ask my friends to vote?",
        "Yes, provided that your promotion does not violate the challenge’s voting rules.",
      ],
      [
        "Can I buy votes?",
        "No. Paid, fake, automated or manipulated voting is not permitted unless MAG explicitly announces a paid voting mechanism.",
      ],
      [
        "What happens if someone manipulates the votes?",
        "MAG may investigate suspicious voting activity and remove invalid votes or disqualify entries where appropriate.",
      ],
    ],
  },
  {
    title: "Leaderboards",
    items: [
      [
        "What is the MAG Leaderboard?",
        "The leaderboard shows player or team rankings based on the scoring system used by MAG.",
      ],
      [
        "How do I get on the leaderboard?",
        "Participate in eligible MAG activities, earn points and achieve qualifying scores.",
      ],
      [
        "Does being on the leaderboard mean I won?",
        "Not necessarily. A leaderboard position and an official challenge victory can have different rules.",
      ],
      [
        "Can my leaderboard position change?",
        "Yes. Rankings can change as players participate and earn additional points.",
      ],
    ],
  },
  {
    title: "Winning Challenges",
    items: [
      [
        "How are MAG winners selected?",
        "Winner selection depends on the challenge. It may involve judges, scores, community voting, performance, completion time or a combination of criteria.",
      ],
      [
        "What happens after I win?",
        "MAG will contact or announce eligible winners according to the challenge rules and coordinate the reward or recognition process.",
      ],
      [
        "How do I claim my prize?",
        "Follow the instructions provided by MAG after the winner announcement.",
      ],
      [
        "Can someone else collect my prize?",
        "Only where MAG approves it and provides instructions for doing so.",
      ],
      [
        "What happens if a winner cannot be reached?",
        "MAG may use the contact information associated with the player’s account or announce an alternative process.",
      ],
    ],
  },
  {
    title: "MAG Rewards",
    items: [
      [
        "What kinds of rewards can MAG players win?",
        "Rewards may include:\n• Cash or airtime\n• Data\n• MAG Points\n• Digital subscriptions\n• Learning opportunities\n• Mentorship\n• Skill Products\n• MAG merchandise\n• Masterclasses\n• Career opportunities\n• Recognition\n• Other prizes announced by MAG",
      ],
      [
        "Are MAG rewards guaranteed?",
        "No. Rewards depend on the specific challenge, promotion or activity.",
      ],
      [
        "Can MAG change a reward?",
        "If circumstances require a change, MAG may provide an equivalent or alternative reward.",
      ],
    ],
  },
  {
    title: "MAG Clubs",
    items: [
      [
        "What is a MAG Club?",
        "A MAG Club is a community of MAG players organized around a school, campus, community, organization or other group.",
      ],
      [
        "What is a MAG Club Leader?",
        "A MAG Club Leader helps introduce people to MAG, grow the MAG community and support players in participating in MAG activities.",
      ],
      [
        "How can I become a MAG Club Leader?",
        "Apply through the official MAG recruitment process when applications are open.",
      ],
      [
        "Can a MAG Club Leader earn money?",
        "Eligible MAG Club Leaders can earn commissions through approved MAG referral activities.",
      ],
      [
        "How much commission can a MAG Club Leader earn?",
        "Under the current MAG Club referral model, a MAG Club Leader can earn 10% commission on eligible MAG Ticket purchases made through their referral code.",
      ],
      [
        "Can anyone become a MAG Club Leader?",
        "MAG may have eligibility and selection requirements. Follow the current recruitment announcement.",
      ],
    ],
  },
  {
    title: "MAG Opportunities",
    items: [
      [
        "What is the Opportunities section?",
        "It is where MAG can connect players with opportunities related to their skills, including competitions, training, internships, apprenticeships, jobs, mentorship and other opportunities.",
      ],
      [
        "Does joining MAG guarantee me a job?",
        "No. MAG provides access to opportunities, but selection depends on the requirements of each opportunity.",
      ],
      [
        "How can I improve my chances of getting opportunities?",
        "Build your MAG profile, participate consistently, develop your skills, earn MAG Points and submit strong challenge entries.",
      ],
    ],
  },
  {
    title: "MAG Skill Categories",
    items: [
      [
        "What skills does MAG recognize?",
        "MAG can recognize different categories of skills, including:\n• Tech — technology, programming, digital skills and related abilities.\n• Creative — design, drawing, writing, music, photography and other creative abilities.\n• Manual — practical, technical and hands-on skills.\n• Physical — sports, fitness and physical performance.\n• Soft Skills — communication, leadership, teamwork, problem-solving and other human skills.",
      ],
      [
        "Do I need to have only one skill?",
        "No. You can develop and demonstrate multiple skills.",
      ],
      [
        "What if I don’t know my strongest skill?",
        "That’s okay. Participate in different MAG activities and discover what you’re good at.",
      ],
    ],
  },
  {
    title: "MAG Community",
    items: [
      [
        "Why should I join the MAG community?",
        "The MAG community helps players stay updated about challenges, games, opportunities, announcements, rewards and other activities.",
      ],
      [
        "Where can I find the official MAG community?",
        "Join only through official MAG links and announcements.",
      ],
      [
        "How do I know if a MAG announcement is genuine?",
        "Check whether it comes from an official MAG communication channel. When in doubt, contact MAG support before sending money or personal information.",
      ],
    ],
  },
  {
    title: "Account Safety",
    items: [
      [
        "Should I share my MAG password?",
        "No. Never share your password with anyone.",
      ],
      [
        "Will MAG ask for my password?",
        "MAG support should not need your password to assist you.",
      ],
      [
        "Someone says they are from MAG and asks me for money. What should I do?",
        "Do not send money immediately. Verify the request through an official MAG channel.",
      ],
      [
        "What if someone is pretending to be MAG?",
        "Report the account or message to MAG through the official support channel.",
      ],
      [
        "Can I sell my MAG account?",
        "No. MAG accounts should not be sold or transferred unless MAG explicitly introduces an approved account-transfer system.",
      ],
    ],
  },
  {
    title: "Fair Play",
    items: [
      [
        "Can I cheat in a MAG Challenge?",
        "No. MAG is built around genuine skill and fair competition.",
      ],
      [
        "Can I use AI for a challenge?",
        "This depends on the specific challenge. Some challenges may permit AI while others may require entirely human-created work.\n\nAlways check the challenge rules.",
      ],
      [
        "Can I copy another person’s work?",
        "No. Your submission should follow the originality requirements of the challenge.",
      ],
      [
        "What happens if I cheat?",
        "MAG may disqualify the submission, remove points or rewards, restrict the account, or take other appropriate action.",
      ],
    ],
  },
  {
    title: "Technical Problems",
    items: [
      [
        "The MAG website isn’t loading. What should I do?",
        "Check your internet connection, refresh the page and try again. If the problem continues, contact MAG support.",
      ],
      [
        "My MAG Points aren’t showing.",
        "Give the system some time to update, then check again. If the points are still missing, contact MAG support with evidence.",
      ],
      [
        "My challenge submission isn’t showing.",
        "Confirm that your submission was successfully completed and that your link is accessible. If there is still a problem, contact MAG support.",
      ],
      [
        "My payment didn’t go through.",
        "Check your payment method and transaction status. Do not repeatedly make payments if you are unsure whether the first transaction succeeded. Contact MAG support if necessary.",
      ],
      [
        "I was charged but didn’t receive what I paid for.",
        "Keep your payment receipt or transaction reference and contact MAG support.",
      ],
    ],
  },
  {
    title: "New Player Quick Start",
    items: [
      [
        "I’m new to MAG. What should I do first?",
        "Step 1: Create your free MAG account.\nStep 2: Complete your profile.\nStep 3: Join the official MAG community.\nStep 4: Explore available games and challenges.\nStep 5: Earn your first MAG Points.\nStep 6: Get a MAG Ticket when required.\nStep 7: Participate in challenges.\nStep 8: Build your MAG profile and leaderboard position.\nStep 9: Invite friends and grow your network.\nStep 10: Look out for opportunities.",
      ],
    ],
  },
  {
    title: "The Most Important MAG Questions",
    items: [
      [
        "What’s the easiest way to start earning MAG Points?",
        "Start participating in eligible MAG activities and challenges. Also take advantage of active referral campaigns.",
      ],
      [
        "What’s the fastest way to understand MAG?",
        "Create your account, join the community and participate in your first activity.",
      ],
      [
        "Do I have to be talented to play MAG?",
        "No. MAG is also about discovering and developing your skills.",
      ],
      [
        "Do I have to win to benefit from MAG?",
        "No. You can gain experience, MAG Points, exposure, connections and access to opportunities through participation.",
      ],
      [
        "What makes MAG different?",
        "MAG is designed around the idea that skills should create opportunities. Instead of only asking what certificate you have, MAG creates ways for you to demonstrate what you can actually do.",
      ],
      [
        "What is the ultimate goal of being a MAG Player?",
        "Build your skills. Prove your skills. Earn recognition. Find opportunities. Master your future.",
      ],
    ],
  },
];

const GOLDEN_RULES = [
  "Read the challenge rules before participating.",
  "Use only your genuine MAG account.",
  "Never cheat or manipulate votes.",
  "Submit your work before the deadline.",
  "Make sure your submission link works.",
  "Protect your account information.",
  "Keep your MAG Points earned legitimately.",
  "Follow official MAG announcements.",
  "Ask for help when you’re confused.",
  "Keep playing, keep learning and keep building your skills.",
];

const FaqPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
          to="/"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="text-center my-10">
          <h1 className="text-4xl font-bold text-primary">
            MAG Player Guide
          </h1>
          <p className="opacity-80 mt-2">Frequently Asked Questions</p>
        </div>

        <div className="space-y-10">
          {FAQ.map((section, i) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold mb-3">
                {i + 1}. {section.title}
              </h2>
              <div className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
                {section.items.map(([q, a]) => (
                  <details key={q} className="group py-4">
                    <summary className="flex justify-between gap-4 cursor-pointer list-none font-medium">
                      {q}
                      <span className="text-primary transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 whitespace-pre-line text-gray-600 dark:text-gray-400">
                      {a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-2xl bg-primary/10 p-6">
            <h2 className="text-xl font-semibold mb-3">
              MAG Player Golden Rules
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              {GOLDEN_RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
          </section>

          <div className="text-center py-6">
            <p className="font-semibold">
              PLAY. COMPETE. BUILD SKILLS. EARN POINTS. FIND OPPORTUNITIES.
            </p>
            <p className="text-2xl font-bold text-primary mt-2">
              Your Skill Will Make Room For You.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
