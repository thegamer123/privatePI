<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Team
 *
 * @ORM\Table(name="team")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TeamRepository")
 */
class Team
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="fieldOfActivity", type="string", length=255, nullable=true)
     */
    private $fieldOfActivity;

    /**
     * @var int
     *
     * @ORM\Column(name="velocity", type="integer", nullable=true)
     */
    private $velocity;

    /**
     * @var string
     *
     * @ORM\Column(name="logo", type="string", length=10000, nullable=true)
     */
    private $logo;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Team
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set fieldOfActivity
     *
     * @param string $fieldOfActivity
     *
     * @return Team
     */
    public function setFieldOfActivity($fieldOfActivity)
    {
        $this->fieldOfActivity = $fieldOfActivity;

        return $this;
    }

    /**
     * Get fieldOfActivity
     *
     * @return string
     */
    public function getFieldOfActivity()
    {
        return $this->fieldOfActivity;
    }

    /**
     * Set velocity
     *
     * @param integer $velocity
     *
     * @return Team
     */
    public function setVelocity($velocity)
    {
        $this->velocity = $velocity;

        return $this;
    }

    /**
     * Get velocity
     *
     * @return int
     */
    public function getVelocity()
    {
        return $this->velocity;
    }

    /**
     * Set logo
     *
     * @param string $logo
     *
     * @return Team
     */
    public function setLogo($logo)
    {
        $this->logo = $logo;

        return $this;
    }

    /**
     * Get logo
     *
     * @return string
     */
    public function getLogo()
    {
        return $this->logo;
    }
}

